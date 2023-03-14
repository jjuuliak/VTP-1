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
    await db.query('INSERT INTO scheduling (event, person, week) VALUES ("Test event", "Test person", 1)');
  });

  // After each test, delete all scheduling records from the database
  afterEach(async () => {
    await db.query('DELETE FROM scheduling');
  });

  describe('POST /api/scheduling', () => {
    it('should create a new scheduling record', async () => {
      const res = await request(app)
        .post('/api/scheduling')
        .send({ event: 'New event', person: 'New person', week: 2 });
      assert.equal(res.status, 201);
      assert.isNumber(res.body.id);
      assert.equal(res.body.event, 'New event');
      assert.equal(res.body.person, 'New person');
      assert.equal(res.body.week, 2);
    });

    it('should return an error when missing required fields', async () => {
      const res = await request(app)
        .post('/api/scheduling')
        .send({ event: 'New event', person: 'New person' });
      assert.equal(res.status, 500);
      assert.equal(res.body.error, 'Error creating scheduling');
    });
  });

  describe('GET /api/scheduling', () => {
    it('should retrieve all scheduling records', async () => {
      const response = await chai.request(app).get('/api/scheduling');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(1);
      const scheduling = response.body[0];
      expect(scheduling).to.have.property('event', 'Test event');
      expect(scheduling).to.have.property('person', 'Test person');
      expect(scheduling).to.have.property('week', 1);
    });
  });

  describe('DELETE /api/scheduling/:id', () => {
    it('should return a 404 error if the scheduling does not exist', async () => {
      const response = await chai.request(app).delete('/api/scheduling/9999');
      expect(response).to.have.status(404);
      expect(response.body).to.deep.equal({ error: 'Scheduling with id 9999 not found' });
    });

    it('should delete a scheduling and return a 204 status code', async () => {
      // Insert a scheduling to delete
      const insertResponse = await chai.request(app)
        .post('/api/scheduling')
        .send({ event: 'Delete event', person: 'Delete person', week: 2 });
      const schedulingId = insertResponse.body.id;

      // Delete the scheduling
      const deleteResponse = await chai.request(app).delete(`/api/scheduling/${schedulingId}`);
      expect(deleteResponse).to.have.status(204);

      // Check that the scheduling was deleted
      const getResponse = await chai.request(app).get(`/api/scheduling/${schedulingId}`);
      expect(getResponse).to.have.status(404);
      expect(getResponse.body).to.deep.equal({ error: `Scheduling with id ${schedulingId} not found` });
    });
  });

  describe('GET /api/scheduling', () => {
    it('should retrieve all scheduling records', async () => {
      const response = await chai.request(app).get('/api/scheduling');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(1);
      const scheduling = response.body[0];
      expect(scheduling).to.have.property('event', 'Delete event');
      expect(scheduling).to.have.property('person', 'Delete person');
      expect(scheduling).to.have.property('week', 2);
    });
  });
  
  describe('PUT /api/scheduling/:id', () => {
    // Create a scheduling to update
    let schedulingId;
    before(async () => {
      const result = await db.query(
        'INSERT INTO scheduling (event, person, week) VALUES (?, ?, ?)',
        ['Update event', 'Update person', 2]
      );
      schedulingId = result.insertId;
    });
  
    // Test updating an existing scheduling
    it('should update an existing scheduling', async () => {
      const res = await chai
        .request(app)
        .put(`/api/scheduling/${schedulingId}`)
        .send({
          event: 'Updated event',
          person: 'Updated person',
          week: 3,
        });
      expect(res).to.have.status(204);
  
      const updatedScheduling = await db.query('SELECT * FROM scheduling WHERE id = ?', [
        schedulingId,
      ]);
      expect(updatedScheduling[0]).to.deep.include({
        id: schedulingId,
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
          event: 'Updated event',
          person: 'Updated person',
          week: 3,
        });
      expect(res).to.have.status(404);
      expect(res.body).to.deep.equal({ error: 'Scheduling with id 999 not found' });
    });
  
    // Clean up the test data
    after(async () => {
      await db.query('DELETE FROM scheduling WHERE id = ?', [schedulingId]);
    });
  });
  
  describe('GET /api/scheduling/:id', () => {
    it('should return a 404 error if the scheduling does not exist', async () => {
      const response = await chai.request(app).get('/api/scheduling/9999');
      expect(response).to.have.status(404);
      expect(response.body).to.deep.equal({ error: 'Scheduling with id 9999 not found' });
    });
  
    it('should return the requested scheduling', async () => {
      const insertResponse = await chai.request(app)
        .post('/api/scheduling')
        .send({ event: 'Get event', person: 'Get person', week: 2 });
      const schedulingId = insertResponse.body.id;
  
      const response = await chai.request(app).get(`/api/scheduling/${schedulingId}`);
      expect(response).to.have.status(200);
      expect(response.body).to.deep.include({
        id: schedulingId,
        event: 'Get event',
        person: 'Get person',
        week: 2,
      });
    });
  });

});