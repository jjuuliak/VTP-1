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
  // Before each test, create a new scheduling record in the database
  beforeEach(async () => {
    const query = `
      INSERT INTO scheduling (draft_id, event, person, week)
      VALUES (?, ?, ?, ?)
    `;
    const values = [1, "Test event", "Test person", 1];
    await db.query(query, values);
  });

  // After each test, delete all scheduling records from the database
  afterEach(async () => {
    await db.query('DELETE FROM scheduling');
  });

  describe('POST /api/scheduling', () => {
    it('should create a new scheduling record', async () => {
      const res = await request(app)
        .post('/api/scheduling')
        .send({ draft_id: 1, event: 'New event', person: 'New person', week: 2 });
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
      .send({ draft_id: 1, event: 'Test event', person: 'Test person', week: 1 });
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
        .send({ draft_id: 1, event: 'Delete event', person: 'Delete person', week: 2 });
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
    // Create a scheduling to update
    let schedulingId;
    before(async () => {
      const result = await db.query(
        'INSERT INTO scheduling (draft_id, event, person, week) VALUES (?, ?, ?, ?)',
        [1, 'Update event', 'Update person', 2]
      );
      schedulingId = result[0].insertId;
    });
  
    // Test updating an existing scheduling
    it('should update an existing scheduling', async () => {
      const res = await chai
        .request(app)
        .put(`/api/scheduling/${schedulingId}`)
        .send({
          draft_id: 2,
          event: 'Updated event',
          person: 'Updated person',
          week: 3,
        });
      expect(res).to.have.status(200);
  
      const updatedScheduling = await db.query('SELECT * FROM scheduling WHERE id = ?', [
        schedulingId,
      ]);
      expect(updatedScheduling[0]).to.deep.include({
        id: schedulingId,
        draft_id: 2,
        event: 'Updated event',
        person: 'Updated person',
        week: 3,
      });
    });
  
    // Test updating a non-existent scheduling
    it('should return a 404 error if the scheduling does not exist', async () => {
      const res = await chai
        .request(app)
        .put('/api/scheduling/999')
        .send({
          draft_id: 2,
          event: 'Updated event',
          person: 'Updated person',
          week: 3,
        });
      expect(res).to.have.status(404);
      expect(res.body).to.deep.equal({ error: 'Scheduling not found' });
    });
  
    // Clean up the test data
    after(async () => {
      await db.query('DELETE FROM scheduling WHERE id = ?', [schedulingId]);
    });
  });

});
