const server = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('/drafts', () => {
    // Test GET /drafts endpoint
    describe('GET /', () => {
        it('should return all drafts', (done) => {
            chai.request(server)
                .get('/drafts')
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    // Test POST /drafts endpoint
    describe('POST /', () => {
        it('should create a new draft', (done) => {
            const draft = {
                title: 'My new draft',
                body: 'This is the body of my new draft'
            };
            chai.request(server)
                .post('/drafts')
                .send(draft)
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.an('object');
                    chai.expect(res.body).to.have.property('id');
                    chai.expect(res.body.title).to.equal(draft.title);
                    chai.expect(res.body.body).to.equal(draft.body);
                    done();
                });
        });
    });

    // Test PUT /drafts/:id endpoint
    describe('PUT /:id', () => {
        it('should update an existing draft', (done) => {
            const draft = {
                title: 'My updated draft',
                body: 'This is the updated body of my draft'
            };
            chai.request(server)
                .get('/drafts')
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.an('array');
                    const id = res.body[0].id; // assuming at least one draft exists
                    chai.request(server)
                        .put(`/drafts/${id}`)
                        .send(draft)
                        .end((err, res) => {
                            chai.expect(res).to.have.status(200);
                            chai.expect(res.body).to.be.an('object');
                            chai.expect(res.body.id).to.equal(id);
                            chai.expect(res.body.title).to.equal(draft.title);
                            chai.expect(res.body.body).to.equal(draft.body);
                            done();
                        });
                });
        });
    });

    // Test DELETE /drafts/:id endpoint
    describe('DELETE /:id', () => {
        it('should delete an existing draft', (done) => {
            chai.request(server)
                .get('/drafts')
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.an('array');
                    const id = res.body[0].id; // assuming at least one draft exists
                    chai.request(server)
                        .delete(`/drafts/${id}`)
                        .end((err, res) => {
                            chai.expect(res).to.have.status(200);
                            chai.request(server)
                                .get(`/drafts/${id}`)
                                .end((err, res) => {
                                    chai.expect(res).to.have.status(404);
                                    done();
                                });
                        });
                });
        });
    });

    // Add after() hook to close the server
    after((done) => {
        server.close(() => {
            done();
        });
    });
});
