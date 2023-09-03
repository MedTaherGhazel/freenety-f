const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const { beforeEach } = require('mocha')

chai.use(chaiHttp)
const expect = chai.expect
let token

// create new talent user
describe('POST /register', () => {
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

describe('Talent Routes test', () => {
  // Login and get token before running tests
  let userId;

  beforeEach(done => {
    chai
      .request(app)
      .post('/api/login')
      .send({
        username: 'testtalent',
        password: 'passwordtalent'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        token = res.body.token;
        userId = res.body.id; // save user ID
        done();
      });
  });

  // Test GET /talents route
  it('should GET all talent profiles', done => {
    chai
      .request(app)
      .get('/api/talents')
      .set('Authorization', `${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('array')
        done()
      })
  })

  // Test PUT /talents route
  it('should update a talent profile', done => {
    const data = {
      company_name: 'ESPRIT',
      membership_type: 'PREMIUM'
    }
    chai
      .request(app)
      .put(`/api/talents/${userId}`)
      .set('Authorization', `${token}`)
      .send(data)
      .end((err, res) => {
        console.log(' === >>> error updating post excution: ', err);
        expect(res).to.have.status(204)
        done()
      })
  })
})

// Test for the /users/:id route; testtalent user
describe('users: DELETE /users/:id', () => {
  let token
  let userId
  before(done => {
    chai
      .request(app)
      .post('/api/login')
      .send({
        username: 'testtalent',
        password: 'passwordtalent'
      })
      .end((err, res) => {
        expect(res).to.have.status(200)
        token = res.body.token
        userId = res.body.id // save user ID
        done()
      })
  })

  it('should delete testtalent user', done => {
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
