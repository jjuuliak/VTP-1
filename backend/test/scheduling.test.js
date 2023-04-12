const assert = require('chai').assert;
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const db = require('../db');

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('Scheduling API', () => {
  let createdSubjectId, createdDraftId, createdInspectionInfoId, createdTargetTimeframeId, createdDocumentId, createdSchedulingId;

  before(async () => {
      // Clear database tables before starting tests
      await db.query('DELETE FROM target_timeframes');
      await db.query('DELETE FROM documents');
      await db.query('DELETE FROM scheduling');
      await db.query('DELETE FROM inspection_information');
      await db.query('DELETE FROM drafts');
      await db.query('DELETE FROM inspection_subject');
  });

  beforeEach(async () => {
      // Add data needed for the tests
      const [subjectResult] = await db.query("INSERT INTO inspection_subject (name) VALUES ('Test Subject')");
      createdSubjectId = subjectResult.insertId;

      const [draftResult] = await db.query("INSERT INTO drafts (subject_id) VALUES (?)", [createdSubjectId]);
      createdDraftId = draftResult.insertId;

      const [inspectionInfoResult] = await db.query(`INSERT INTO inspection_information (draft_id, subject_of_inspection, issue, risk_area, official_duration_period, total_duration_period, participants, responsible_inspector, office, department, subject_contact_information, inspection_contact_person)
                          VALUES (?, 'Test Inspection', 'Test issue', 'Test risk area', '1 week', '1 week', 'John Doe', 'Inspector', 'Office', 'Department', 'Subject contact info', 'Contact person')`, [createdDraftId]);
      createdInspectionInfoId = inspectionInfoResult.insertId;

      const [targetTimeframeResult] = await db.query("INSERT INTO target_timeframes (draft_id, goal, planned_date) VALUES (?, 'Test Goal', '2023-01-01')", [createdDraftId]);
      createdTargetTimeframeId = targetTimeframeResult.insertId;

      const [documentResult] = await db.query("INSERT INTO documents (draft_id, title) VALUES (?, 'Test Document')", [createdDraftId]);
      createdDocumentId = documentResult.insertId;

      const [schedulingResult] = await db.query("INSERT INTO scheduling (draft_id, event, person, week) VALUES (?, 'Test Event', 'John Doe', 1)", [createdDraftId]);
      createdSchedulingId = schedulingResult.insertId;
  });

  afterEach(async () => {
      // Clear database tables after each test
      await db.query('DELETE FROM target_timeframes');
      await db.query('DELETE FROM documents');
      await db.query('DELETE FROM scheduling');
      await db.query('DELETE FROM inspection_information');
      await db.query('DELETE FROM drafts');
      await db.query('DELETE FROM inspection_subject');
  });

  describe('POST /api/scheduling', () => {
    it('should create a new scheduling record', async () => {
      const res = await request(app)
        .post('/api/scheduling')
        .send({ draft_id: createdDraftId, event: 'New event', person: 'New person', week: 2 });
      assert.equal(res.status, 201);
      assert.isNumber(res.body.id);
    });

    it('should return an error when missing required fields', async () => {
      const res = await request(app)
        .post('/api/scheduling')
        .send({ event: 'New event', person: 'New person' });
      assert.equal(res.status, 500);
      assert.equal(res.body.error, 'Error creating scheduling');
    });
  });

  describe('GET /api/scheduling/:id', () => {
    it('should retrieve one scheduling record by id', async () => {
      // Insert a scheduling to get
      const insertResponse = await chai.request(app)
        .post('/api/scheduling')
        .send({ draft_id: createdDraftId, event: 'Test event', person: 'Test person', week: 1 });
      const id = insertResponse.body.id;
      const response = await chai.request(app).get(`/api/scheduling/${id}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('event', 'Test event');
      expect(response.body).to.have.property('person', 'Test person');
      expect(response.body).to.have.property('week', 1);
    });

    it('should return an error if scheduling not found', async () => {
      const id = 9999;
      const response = await chai.request(app).get(`/api/scheduling/${id}`);
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('error', 'Scheduling not found');
    });
  });

  describe('DELETE /api/scheduling/:id', () => {
    it('should return a 404 error if the scheduling does not exist', async () => {
      const response = await chai.request(app).delete('/api/scheduling/9999');
      expect(response).to.have.status(404);
      expect(response.body).to.deep.equal({ error: 'Scheduling not found' });
    });

    it('should delete a scheduling and return a 200 status code with a message', async () => {
      // Insert a scheduling to delete
      const insertResponse = await chai.request(app)
        .post('/api/scheduling')
        .send({ draft_id: createdDraftId, event: 'Delete event', person: 'Delete person', week: 2 });
      const schedulingId = insertResponse.body.id;

      // Delete the scheduling
      const deleteResponse = await chai.request(app).delete(`/api/scheduling/${schedulingId}`);
      expect(deleteResponse).to.have.status(200);
      expect(deleteResponse.body).to.deep.equal({ message: 'Scheduling deleted successfully' });

      // Check that the scheduling was deleted
      const getResponse = await chai.request(app).get(`/api/scheduling/${schedulingId}`);
      expect(getResponse).to.have.status(404);
      expect(getResponse.body).to.deep.equal({ error: `Scheduling not found` });
    });
  });
  
  describe('PUT /api/scheduling/:id', () => {
    // Test updating an existing scheduling
    it('should update an existing scheduling', async () => {
      const res = await chai
        .request(app)
        .put(`/api/scheduling/${createdSchedulingId}`)
        .send({
          draft_id: createdDraftId,
          event: 'Updated event',
          person: 'Updated person',
          week: 3,
        });
      expect(res).to.have.status(200);

      const updatedScheduling = await db.query('SELECT * FROM scheduling WHERE id = ?', [
        createdSchedulingId,
      ]);
      expect(updatedScheduling[0]).to.deep.include({
        id: createdSchedulingId,
        draft_id: createdDraftId,
        event: 'Updated event',
        person: 'Updated person',
        week: 3,
      });
    });

    // Test updating a non-existent scheduling
    it('should return a 404 error if the scheduling does not exist', async () => {
      const nonExistentSchedulingId = 999;
      const res = await chai
        .request(app)
        .put(`/api/scheduling/${nonExistentSchedulingId}`)
        .send({
          draft_id: createdDraftId,
          event: 'Updated event',
          person: 'Updated person',
          week: 3,
        });
      expect(res).to.have.status(404);
      expect(res.body).to.deep.equal({ error: 'Scheduling not found' });
    });
  });
});
