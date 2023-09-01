
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { beforeEach } = require('mocha');

chai.use(chaiHttp);
const expect = chai.expect;
let token;

xdescribe('Staff Routes test', () => {
  // Login and get token before running tests
  beforeEach((done) => {
    chai.request(app)
      .post('/api/login')
      .send({
        username: 'demo_user',
        password: 'demo_password'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        token = res.body.token;
        done();
      });
  });

  // Test GET /staffs route
  it('should GET all staff profiles', (done) => {
    chai.request(app)
      .get('/api/staffs')
      .set('Authorization', `${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });

  // Test PUT /staffs route
  it('should update a staff profile', (done) => {
    const staffId = 1
    const data = {
      position: 'dev',
      departement: 'IT',
      isActive: true
    }
    chai.request(app)
      .put(`/api/staffs/${staffId}`)
      .set('Authorization', `${token}`)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

});
