const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const { beforeEach } = require('mocha')

chai.use(chaiHttp)
const expect = chai.expect
let token

// create new staff user
describe('POST /register', () => {
  it('should register a new staff user', done => {
    chai
      .request(app)
      .post('/api/register')
      .send({
        username: 'teststaff',
        email: 'teststaff@freejnety.com',
        password: 'passwordstaff',
        role: { roles: ['BASIC', 'STAFF'] }
      })
      .end((err, res) => {
        expect(res).to.have.status(201)
        done()
      })
  })
})

describe('Staff Routes test', () => {
  // Login and get token before running tests
  let userId;

  beforeEach(done => {
    chai
      .request(app)
      .post('/api/login')
      .send({
        username: 'teststaff',
        password: 'passwordstaff'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        token = res.body.token;
        userId = res.body.id; // save user ID
        done();
      });
  });

  // Test GET /staffs route
  it('should GET all staff profiles', done => {
    chai
      .request(app)
      .get('/api/staffs')
      .set('Authorization', `${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('array')
        done()
      })
  })

  // Test PUT /staffs route
  it('should update a staff profile', done => {
    const data = {
      position: 'dev',
      departement: 'IT',
      isActive: true
    }
    chai
      .request(app)
      .put(`/api/staffs/${userId}`)
      .set('Authorization', `${token}`)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

})
