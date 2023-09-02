
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { beforeEach } = require('mocha');

chai.use(chaiHttp);
const expect = chai.expect;
let token;

// create new talent user
xdescribe('POST /register', () => {
  it('should register a new talent user', done => {
    chai
      .request(app)
      .post('/api/register')
      .send({
        username: 'testtalent',
        email: 'testtalent@freejnety.com',
        password: 'passwordtalent',
        role: { roles: ['BASIC', 'TALENT'] }
      })
      .end((err, res) => {
        expect(res).to.have.status(201)
        done()
      })
  })
})

xdescribe('Talent Routes test', () => {
  // Login and get token before running tests
  beforeEach((done) => {
    chai.request(app)
      .post('/api/login')
      .send({
        username: 'testtalent',
        password: 'passwordtalent'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        token = res.body.token;
        done();
      });
  });

  // Test GET /talents route
  it('should GET all talent profiles', (done) => {
    chai.request(app)
      .get('/api/talents')
      .set('Authorization', `${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });

  // Test PUT /talents route
  it('should update a talent profile', (done) => {
    const talentId = 1
    const data = {
      portfolio: 'some portfolio url',
      membership_type: 'PREMIUM'
    }
    chai.request(app)
      .put(`/api/talents/${talentId}`)
      .set('Authorization', `${token}`)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

});
