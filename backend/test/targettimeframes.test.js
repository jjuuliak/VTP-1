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

    describe('POST /api/target_timeframes', () => {
        it('should create a new target timeframe record', async () => {
            const res = await request(app)
                .post('/api/target_timeframes')
                .send({ draft_id: createdDraftId, goal: 'Test goal', planned_date: '2022-01-01', actual_date: '2022-01-02', comments: 'Test comments', document_id: createdDocumentId, link_text: 'Test link' });
        
            if (res.status !== 201 || typeof res.body.id !== 'number') {
                console.error('Unexpected response body:', res.body);
            }
        
            assert.equal(res.status, 201);
            assert.isNumber(res.body.id);
        });
        

        it('should return an error when missing required fields', async () => {
            const res = await request(app)
                .post('/api/target_timeframes')
                .send({ planned_date: '2022-01-01', actual_date: '2022-01-02', comments: 'Test comments', document_id: 1, link_text: 'Test link' });
            assert.equal(res.status, 500);
            assert.equal(res.body.error, 'Error creating target timeframes');
        });
    });

    describe('GET /api/target_timeframes/:id', () => {
        it('should retrieve the target timeframe with the given id', async () => {
            const postResponse = await request(app)
                .post('/api/target_timeframes')
                .send({ draft_id: createdDraftId, goal: 'Test goal', planned_date: '2022-01-01', actual_date: '2022-01-02', comments: 'Test comments', document_id: createdDocumentId, link_text: 'Test link' });

            const targetTimeframeId = postResponse.body.id;
            const response = await chai.request(app).get(`/api/target_timeframes/${targetTimeframeId}`);
            expect(response.status).to.equal(200);
            expect(response.body).to.include({
                id: targetTimeframeId,
                draft_id: createdDraftId,
                goal: 'Test goal',
                comments: 'Test comments',
                document_id: createdDocumentId,
                link_text: 'Test link'
            });
        });

        it('should return a 404 error if the target timeframe does not exist', async () => {
            const response = await chai.request(app).get('/api/target_timeframes/9999');
            expect(response).to.have.status(404);
            expect(response.body).to.deep.equal({ error: 'Target timeframes not found' });
        });
    });

    describe('PUT /api/target_timeframes/:id', () => {
        it('should update an existing target timeframe', async () => {
            const postResponse = await request(app)
                .post('/api/target_timeframes')
                .send({ draft_id: createdDraftId, goal: 'Test goal', planned_date: '2022-01-01', actual_date: '2022-01-02', comments: 'Test comments', document_id: createdDocumentId, link_text: 'Test link' });

            const targetTimeframeId = postResponse.body.id;

            const res = await request(app)
                .put(`/api/target_timeframes/${targetTimeframeId}`)
                .send({ draft_id: createdDraftId, goal: 'Updated goal', planned_date: '2022-01-05', actual_date: '2022-01-06', comments: 'Updated comments', document_id: createdDocumentId, link_text: 'Updated link' });

            assert.equal(res.status, 200);
            assert.equal(res.body.message, 'Target timeframes updated successfully');

            const response = await chai.request(app).get(`/api/target_timeframes/${targetTimeframeId}`);
            expect(response.status).to.equal(200);
            expect(response.body).to.include({
                id: targetTimeframeId,
                draft_id: createdDraftId,
                goal: 'Updated goal',
                comments: 'Updated comments',
                document_id: createdDocumentId,
                link_text: 'Updated link'
            });
        });

        it('should return a 404 error if the target timeframe does not exist', async () => {
            const res = await request(app)
                .put('/api/target_timeframes/9999')
                .send({ draft_id: 2, goal: 'Updated goal', planned_date: '2022-01-05', actual_date: '2022-01-06', comments: 'Updated comments', document_id: 2, link_text: 'Updated link' });

            assert.equal(res.status, 404);
            assert.equal(res.body.error, 'Target timeframes not found');
        });
    });

    describe('DELETE /api/target_timeframes/:id', () => {
        it('should delete an existing target timeframe', async () => {
            const postResponse = await request(app)
                .post('/api/target_timeframes')
                .send({ draft_id: createdDraftId, goal: 'Test goal', planned_date: '2022-01-01', actual_date: '2022-01-02', comments: 'Test comments', document_id: createdDocumentId, link_text: 'Test link' });

            const targetTimeframeId = postResponse.body.id;
            const res = await request(app).delete(`/api/target_timeframes/${targetTimeframeId}`);

            assert.equal(res.status, 200);
            assert.equal(res.body.message, 'Target timeframes deleted successfully');
        });

        it('should return a 404 error if the target timeframe does not exist', async () => {
            const res = await request(app).delete('/api/target_timeframes/9999');
            assert.equal(res.status, 404);
            assert.equal(res.body.error, 'Target timeframes not found');
        });
    });
});

