const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Replace '../app' with the path to your app.js or server.js file
const { insertSampleData, clearSampleData } = require('./testHelpers');

chai.use(chaiHttp);
const { expect } = chai;

describe('Inspections API', () => {
    beforeEach(async () => {
        await clearSampleData();
        await insertSampleData();
    });

    afterEach(async () => {
        await clearSampleData();
    });

    describe('GET /api/inspections', () => {
        it('should return all inspections', (done) => {
            chai
                .request(app)
                .get('/api/inspections')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    res.body.forEach((inspection) => {
                        expect(inspection).to.be.an('object');
                        expect(inspection).to.have.all.keys(
                            'id',
                            'subjectId',
                            'subjectOfInspection',
                            'issue',
                            'riskArea',
                            'officialDuration',
                            'totalDuration',
                            'participants',
                            'responsibleInspector',
                            'office',
                            'department',
                            'subjectContactInformation',
                            'inspectionContactPerson'
                        );
                    });
                    done();
                });
        });
    });

    describe('GET /api/inspections/:id', () => {
        it('should return an inspection by its ID', async () => {
            // First, get all inspections to find an existing ID
            const allInspections = await chai.request(app).get('/api/inspections');
            const { id } = allInspections.body[0];

            chai
                .request(app)
                .get(`/api/inspections/${id}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.all.keys(
                        'id',
                        'subjectId',
                        'subjectOfInspection',
                        'issue',
                        'riskArea',
                        'officialDuration',
                        'totalDuration',
                        'participants',
                        'responsibleInspector',
                        'office',
                        'department',
                        'subjectContactInformation',
                        'inspectionContactPerson'
                    );
                    expect(res.body.id).to.equal(id);
                });
        });

        it('should return a 404 status if the inspection ID is not found', (done) => {
            const nonExistentId = 99999; // Use a number that doesn't exist in your sample data
            chai
                .request(app)
                .get(`/api/inspections/${nonExistentId}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.equal(`Inspection with id ${nonExistentId} not found`);
                    done();
                });
        });
    });

    describe('POST /api/inspections', () => {
        it('should create a new inspection and return the created inspection', (done) => {
            const newInspection = {
                subjectId: 3,
                subjectOfInspection: 'New Sample Subject',
                issue: 'New Sample Issue',
                riskArea: 'New Sample Risk Area',
                officialDuration: '2023-02-01-2023-02-05',
                totalDuration: '2023-02-01-2023-02-07',
                participants: 'New Participant 1, New Participant 2',
                responsibleInspector: 'New Inspector Gadget',
                office: 'New Sample Office',
                department: 'New Sample Department',
                subjectContactInformation: 'newsample@example.com',
                inspectionContactPerson: 'New Contact Person',
            };

            chai
                .request(app)
                .post('/api/inspections')
                .send(newInspection)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.all.keys(
                        'id',
                        'subjectId',
                        'subjectOfInspection',
                        'issue',
                        'riskArea',
                        'officialDuration',
                        'totalDuration',
                        'participants',
                        'responsibleInspector',
                        'office',
                        'department',
                        'subjectContactInformation',
                        'inspectionContactPerson'
                    );
                    expect(res.body.subjectOfInspection).to.equal(newInspection.subjectOfInspection);
                    done();
                });
        });
    });

    describe('DELETE /api/inspections/:id', () => {
        it('should delete an existing inspection and return a 204 status code', async () => {
            // First, get all inspections to find an existing ID
            const allInspections = await chai.request(app).get('/api/inspections');
            const { id } = allInspections.body[0];

            try {
                const deleteRes = await chai.request(app).delete(`/api/inspections/${id}`);
                expect(deleteRes).to.have.status(204);

                // Check if the inspection has been deleted
                const getRes = await chai.request(app).get(`/api/inspections/${id}`);
                expect(getRes).to.have.status(404);
                expect(getRes.body).to.be.an('object');
                expect(getRes.body).to.have.property('error');
                expect(getRes.body.error).to.equal(`Inspection with id ${id} not found`);
            } catch (err) {
                throw new Error(`This should not happen. Error: ${err.message}`);
            }
        });

        it('should return a 404 status code if the inspection ID is not found', async () => {
            const nonExistentInspectionId = 9999;

            try {
                const res = await chai.request(app).delete(`/api/inspections/${nonExistentInspectionId}`);
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(`Inspection with id ${nonExistentInspectionId} not found`);
            } catch (err) {
                throw new Error(`This should not happen. Error: ${err.message}`);
            }
        });

    });

    describe('GET /api/inspections/subject/:subject_id', () => {
        it('should return all inspections with the given subject_id and a 200 status code', async () => {
            const subjectId = 1;
            const res = await chai.request(app)
                .get(`/api/inspections/subject/${subjectId}`);

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            res.body.forEach((inspection) => {
                expect(inspection).to.have.all.keys(
                    'id',
                    'subjectId',
                    'subjectOfInspection',
                    'issue',
                    'riskArea',
                    'officialDuration',
                    'totalDuration',
                    'participants',
                    'responsibleInspector',
                    'office',
                    'department',
                    'subjectContactInformation',
                    'inspectionContactPerson'
                );
                expect(inspection.subjectId).to.equal(subjectId);
            });
        });





        it('should return an empty array and a 200 status code if no inspections have the given subject_id', async () => {
            const nonExistentSubjectId = 99999; // Use a subject_id that doesn't exist in your sample data

            const res = await chai.request(app).get(`/api/inspections/subject/${nonExistentSubjectId}`);

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(0);
        });
    });

});
