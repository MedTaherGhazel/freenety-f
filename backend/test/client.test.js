const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const { beforeEach } = require('mocha')

chai.use(chaiHttp)
const expect = chai.expect
let token

// create new client user
describe('POST /register', () => {
  it('should register a new client user', done => {
    chai
      .request(app)
      .post('/api/register')
      .send({
        username: 'testclient',
        email: 'testclient@freejnety.com',
        password: 'passwordclient',
        role: { roles: ['BASIC', 'CLIENT'] }
      })
      .end((err, res) => {
        expect(res).to.have.status(201)
        done()
      })
  })
})

describe('Client Routes test', () => {
  // Login and get token before running tests
  let userId;

  beforeEach(done => {
    chai
      .request(app)
      .post('/api/login')
      .send({
        username: 'testclient',
        password: 'passwordclient'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        token = res.body.token;
        userId = res.body.id; // save user ID
        done();
      });
  });

  // Test GET /clients route
  it('should GET all client profiles', done => {
    chai
      .request(app)
      .get('/api/clients')
      .set('Authorization', `${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('array')
        done()
      })
  })

  // Test PUT /clients route
  it('should update a client profile', done => {
    const data = {
      company_name: 'ESPRIT',
      membership_type: 'PREMIUM'
    }
    chai
      .request(app)
      .put(`/api/clients/${userId}`)
      .set('Authorization', `${token}`)
      .send(data)
      .end((err, res) => {
        console.log(' === >>> error updating post excution: ', err);
        expect(res).to.have.status(204)
        done()
      })
  })
})


// Test for the /users/:id route; testclient user
describe('users: DELETE /users/:id', () => {
  let token
  let userId
  before(done => {
    chai
      .request(app)
      .post('/api/login')
      .send({
        username: 'testclient',
        password: 'passwordclient'
      })
      .end((err, res) => {
        expect(res).to.have.status(200)
        token = res.body.token
        userId = res.body.id // save user ID
        done()
      })
  })

  it('should delete testclient user', done => {
    chai
      .request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
})
