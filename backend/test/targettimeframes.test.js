const assert = require('chai').assert;
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const db = require('../db');

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('Target Timeframes API', () => {
    // Before each test, create a new target timeframe record in the database
    beforeEach(async () => {
        await db.query('INSERT INTO targettimeframes (target_id, planned_date, actual_date, comments, document_id) VALUES (1, "2022-01-01", "2022-01-02", "Test comments", 1)');
    });

    // After each test, delete all target timeframe records from the database
    afterEach(async () => {
        await db.query('DELETE FROM targettimeframes');
    });

    describe('POST /api/targettimeframes', () => {
        it('should create a new target timeframe record', async () => {
            const res = await request(app)
                .post('/api/targettimeframes')
                .send({ target_id: 2, planned_date: '2022-02-01', actual_date: '2022-02-02', comments: 'Test comments', document_id: 2 });
            assert.equal(res.status, 201);
            assert.isNumber(res.body.id);
            assert.equal(res.body.target_id, 2);
            assert.equal(res.body.planned_date, '2022-02-01');
            assert.equal(res.body.actual_date, '2022-02-02');
            assert.equal(res.body.comments, 'Test comments');
            assert.equal(res.body.document_id, 2);
        });

        it('should return an error when missing required fields', async () => {
            const res = await request(app)
                .post('/api/targettimeframes')
                .send({ planned_date: '2022-02-01', actual_date: '2022-02-02', comments: 'Test comments', document_id: 2 });
            assert.equal(res.status, 500);
            assert.equal(res.body.error, 'Error creating target timeframe');
        });
    });

    describe('GET /api/targettimeframes', () => {
        it('should retrieve all target timeframe records', async () => {
            const response = await chai.request(app).get('/api/targettimeframes');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.equal(1);
            const targetTimeframe = response.body[0];
            expect(targetTimeframe).to.have.property('target_id', 1);
            expect(new Date(targetTimeframe.planned_date).toISOString().substr(0, 10)).to.equal('2022-01-01');
            expect(new Date(targetTimeframe.actual_date).toISOString().substr(0, 10)).to.equal('2022-01-02');
            expect(targetTimeframe).to.have.property('comments', 'Test comments');
            expect(targetTimeframe).to.have.property('document_id', 1);
        });
    });

    describe('DELETE /api/targettimeframes/:id', () => {
        it('should return a 404 error if the target timeframe does not exist', async () => {
            const response = await chai.request(app).delete('/api/targettimeframes/9999');
            expect(response).to.have.status(404);
            expect(response.body).to.deep.equal({ error: 'Target timeframe with id 9999 not found' });
        });

        it('should delete a target timeframe and return a 204 status code', async () => {
            // Insert a target timeframe to delete
            const insertResponse = await chai.request(app)
                .post('/api/targettimeframes')
                .send({ target_id: 1, planned_date: '2022-03-01', actual_date: '2022-03-03', comments: 'Test comment', document_id: 1 });
            const targetTimeframeId = insertResponse.body.id;

            // Delete the target timeframe
            const deleteResponse = await chai.request(app).delete(`/api/targettimeframes/${targetTimeframeId}`);
            expect(deleteResponse).to.have.status(204);

            // Check that the target timeframe was deleted
            const getResponse = await chai.request(app).get(`/api/targettimeframes/${targetTimeframeId}`);
            expect(getResponse).to.have.status(404);
            expect(getResponse.body).to.deep.equal({ error: `Target timeframe with id ${targetTimeframeId} not found` });
        });
    });

    describe('GET /api/targettimeframes/:id', () => {
        it('should return a 404 error if the target timeframe does not exist', async () => {
            const response = await chai.request(app).get('/api/targettimeframes/9999');
            expect(response).to.have.status(404);
            expect(response.body).to.deep.equal({ error: 'Target timeframe with id 9999 not found' });
        });

        it('should return the requested target timeframe', async () => {
            const insertResponse = await chai.request(app)
                .post('/api/targettimeframes')
                .send({ target_id: 1, planned_date: '2022-03-01', actual_date: '2022-03-03', comments: 'Test comment', document_id: 1 });
            const targetTimeframeId = insertResponse.body.id;

            const response = await chai.request(app).get(`/api/targettimeframes/${targetTimeframeId}`);
            expect(response).to.have.status(200);
            expect(response.body).to.deep.include({
                id: targetTimeframeId,
                target_id: 1,
                // planned_date: '2022-03-01',
                // actual_date: '2022-03-03',
                comments: 'Test comment',
                document_id: 1
            });
            expect(new Date(response.body.planned_date).toISOString().substr(0, 10)).to.equal('2022-03-01');
            expect(new Date(response.body.actual_date).toISOString().substr(0, 10)).to.equal('2022-03-03');
        });
    });
});

describe('PUT /api/targettimeframes/:id', () => {
    // Create a target timeframe to update
    let targetTimeframeId;
    before(async () => {
        const result = await db.query(
            'INSERT INTO targettimeframes (target_id, planned_date, actual_date, comments, document_id) VALUES (?, ?, ?, ?, ?)',
            [1, '2022-01-01', null, 'Test comment', null]
        );
        targetTimeframeId = result.insertId;
    });

    // Test updating an existing target timeframe
    it('should update an existing target timeframe', async () => {
        const res = await chai
            .request(app)
            .put(`/api/targettimeframes/${targetTimeframeId}`)
            .send({
                target_id: 1,
                planned_date: '2022-01-02',
                actual_date: '2022-01-01',
                comments: 'Updated comment',
                document_id: null,
            });
        expect(res).to.have.status(204);

        const updatedTargetTimeframe = await db.query('SELECT * FROM targettimeframes WHERE id = ?', [
            targetTimeframeId,
        ]);
        expect(updatedTargetTimeframe[0]).to.deep.include({
            id: targetTimeframeId,
            target_id: 1,
            // planned_date: '2022-01-02',
            // actual_date: '2022-01-01',
            comments: 'Updated comment',
            document_id: null,
        });
        expect(new Date(updatedTargetTimeframe[0].planned_date).toISOString().substr(0, 10)).to.equal('2022-01-02');
        expect(new Date(updatedTargetTimeframe[0].actual_date).toISOString().substr(0, 10)).to.equal('2022-01-01');
    });

    // Test updating a non-existent target timeframe
    it('should return a 404 error if the target timeframe does not exist', async () => {
        const res = await chai
            .request(app)
            .put('/api/targettimeframes/999')
            .send({
                target_id: 1,
                planned_date: '2022-01-02',
                actual_date: '2022-01-01',
                comments: 'Updated comment',
                document_id: null,
            });
        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({ error: 'Target timeframe with id 999 not found' });
    });

    // Clean up the test data
    after(async () => {
        await db.query('DELETE FROM targettimeframes WHERE id = ?', [targetTimeframeId]);
    });
});

describe('Target Timeframes API - Get by target_id', () => {
    before(async () => {
        // create a target timeframe to use for testing
        const results = await db.query(
            'INSERT INTO targettimeframes (target_id, planned_date, actual_date, comments, document_id) VALUES (?, ?, ?, ?, ?)',
            [1, '2023-04-01', '2023-04-05', 'Test comment', 1]
        );
    });

    after(async () => {
        // delete the target timeframe used for testing
        await db.query('DELETE FROM targettimeframes WHERE target_id = ?', [1]);
    });

    it('should return all target timeframes with the given target_id', (done) => {
        chai.request(app)
            .get('/api/targettimeframes/target/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(1);
                done();
            });
    });

    it('should return an empty array if no target timeframes are found with the given target_id', (done) => {
        chai.request(app)
            .get('/api/targettimeframes/target/2')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(0);
                done();
            });
    });

    // it('should return a 500 status if an error occurs while fetching target timeframes', (done) => {
    //     // override the db.query method to simulate an error
    //     db.query = () => {
    //         throw new Error('Test error');
    //     };
    //     chai.request(app)
    //         .get('/api/targettimeframes/target/1')
    //         .end((err, res) => {
    //             res.should.have.status(500);
    //             res.body.should.have.property('error');
    //             done();
    //         });
    // });
});
