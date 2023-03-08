const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../db'); // Added a .
const app = require('../index'); // changed this line

chai.use(chaiHttp);
const { expect } = chai;

describe('/api/documents', () => {
  before(async () => {
    // Clear the documents table before running tests
    await db.query('DELETE FROM documents');
  });

  describe('POST /', () => {
    it('should create a new document', async () => {
      const document = {
        title: 'New Document',
        handler: 'John Smith',
        modified: '2022-03-08 12:00:00'
      };
      const res = await chai.request(app).post('/api/documents').send(document);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('id');
      expect(res.body.title).to.equal(document.title);
      expect(res.body.handler).to.equal(document.handler);
      expect(res.body.modified).to.equal(document.modified);
    });

    it('should return an error if the request body is invalid', async () => {
      const document = {
        handler: 'John Smith',
        modified: '2022-03-08 12:00:00'
      };
      const res = await chai.request(app).post('/api/documents').send(document);
      expect(res).to.have.status(500);
      expect(res.body).to.have.property('error');
    });
  });

  describe('GET /', () => {
    it('should return all documents', async () => {
      const res = await chai.request(app).get('/api/documents');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').with.lengthOf.at.least(3); // assumes there are at least 3 documents in the database
    });
  });

  describe('PUT /:id', () => {
    it('should update an existing document', async () => {
      const existingDocument = { id: 1, title: 'Existing Document', handler: 'Setä Manula', modified: '2022-01-31 00:00:00' };
      await db.query('INSERT INTO documents SET ?', existingDocument);
      const updatedDocument = { title: 'Updated Document', handler: 'Jane Doe', modified: '2022-03-08 12:00:00' };
      const res = await chai.request(app).put(`/api/documents/${existingDocument.id}`).send(updatedDocument);
      expect(res).to.have.status(204);
      const result = await db.query('SELECT * FROM documents WHERE id = ?', [existingDocument.id]);
      expect(result).to.be.an('array').with.lengthOf(1);
      expect(result[0].title).to.equal(updatedDocument.title);
      expect(result[0].handler).to.equal(updatedDocument.handler);
      expect(result[0].modified.toISOString()).to.equal(new Date(updatedDocument.modified).toISOString());
    });

    it('should return an error if the document id is invalid', async () => {
      const updatedDocument = { title: 'Updated Document', handler: 'Jane Doe', modified: '2022-03-08 12:00:00' };
      const res = await chai.request(app).put('/api/documents/999').send(updatedDocument);
      expect(res).to.have.status(404); // Modified the expected status code manually
      expect(res.body).to.have.property('error');
    });
  });

  describe('DELETE /:id', () => {
    it('should delete an existing document', async () => {
      const existingDocument = { id: 69, title: 'Existing Document', handler: 'Setä Manula', modified: '2022-01-31 00:00:00' }; // ChatGPT made the error of trying to push a document with a duplicate id
      await db.query('INSERT INTO documents SET ?', existingDocument);
      const res = await chai.request(app).delete(`/api/documents/${existingDocument.id}`);
      expect(res).to.have.status(204);
      const result = await db.query('SELECT * FROM documents WHERE id = ?', [existingDocument.id]);
      expect(result).to.be.an('array').with.lengthOf(0);
    });
    it('should return an error if the document id is invalid', async () => {
        const res = await chai.request(app).delete('/api/documents/999');
        expect(res).to.have.status(404); // Modified the expected status code manually
        expect(res.body).to.have.property('error');
    });
  });

  // Add after() hook to close the server, Added these call manually since this was also a problem earlier
  after((done) => {
    app.close(() => {
        done();
    });
  });
});