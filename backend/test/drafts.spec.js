const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const request = chai.request;
const db = require('../db');
chai.use(chaiHttp);

describe('/drafts', () => {
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

    describe('POST /api/drafts', () => {
        it('should create a new draft and return its id', async () => {
            const res = await request(app)
                .post('/api/drafts')
                .send({ subject_id: createdSubjectId });

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body.id).to.be.a('number');

            // Check if the draft was actually created
            const [rows] = await db.query('SELECT * FROM drafts WHERE id = ?', [res.body.id]);
            expect(rows.length).to.equal(1);
            expect(rows[0].subject_id).to.equal(createdSubjectId);
        });
    });


    describe('GET /api/drafts', () => {
        it('should return a list of drafts', async () => {
            const res = await request(app).get('/api/drafts');

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.at.least(1);

            // Check if the created draft is in the list
            const createdDraft = res.body.find((draft) => draft.id === createdDraftId);
            expect(createdDraft).to.exist;
            expect(createdDraft.subject_id).to.equal(createdSubjectId);
        });
    });


    describe('GET /api/drafts/:id', () => {
        it('should return the draft with the specified id', async () => {
            const res = await request(app).get(`/api/drafts/${createdDraftId}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('d_id', createdDraftId);
            expect(res.body).to.have.property('subject_id', createdSubjectId);
        });

        it('should return a 404 error if the draft does not exist', async () => {
            const nonExistentId = createdDraftId + 100;
            const res = await request(app).get(`/api/drafts/${nonExistentId}`);

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('error', 'Draft not found');
        });
    });


    describe('DELETE /api/drafts/:id', () => {
        it('should delete an existing draft', async () => {
            const res = await request(app).delete(`/api/drafts/${createdDraftId}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message', 'Draft deleted successfully');

            // Check if the draft was actually deleted
            const [rows] = await db.query('SELECT * FROM drafts WHERE id = ?', [createdDraftId]);
            expect(rows.length).to.equal(0);
        });

        it('should return a 404 error if the draft does not exist', async () => {
            const nonExistentId = createdDraftId + 100;
            const res = await request(app).delete(`/api/drafts/${nonExistentId}`);

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('error', 'Draft not found');
        });
    });


    describe('GET /api/drafts/:id/full', () => {
        it('should return the full draft information with the specified id', async () => {
            const res = await request(app).get(`/api/drafts/${createdDraftId}/full`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('d_id', createdDraftId);
            expect(res.body).to.have.property('subject_id', createdSubjectId);
            expect(res.body).to.have.property('target_timeframes').that.is.an('array');
            expect(res.body).to.have.property('documents').that.is.an('array');
            expect(res.body).to.have.property('scheduling').that.is.an('array');
        });

        it('should return a 404 error if the draft does not exist', async () => {
            const nonExistentId = createdDraftId + 100;
            const res = await request(app).get(`/api/drafts/${nonExistentId}/full`);

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('error', 'Draft not found');
        });
    });
});
