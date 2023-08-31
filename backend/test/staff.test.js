
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { beforeEach } = require('mocha');

chai.use(chaiHttp);
const expect = chai.expect;
let token;

describe('Staff Routes test', () => {
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

  // Add tests for other routes (POST, PUT, DELETE) here

});
