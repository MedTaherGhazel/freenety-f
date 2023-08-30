const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app') // Assuming the server entry point is in app.js

chai.use(chaiHttp)
const expect = chai.expect

describe('User Routes', () => {
  // Test for the /register route
  describe('POST /register', () => {
    it('should register a new user', done => {
      chai
        .request(app)
        .post('/api/register')
        .send({
          username: 'testuser',
          email: 'testuser@freejnety.com',
          password: 'password'
        })
        .end((err, res) => {
          console.log(` === >>> response status and message: ${JSON.stringify(res.body)}`);
          expect(res).to.have.status(201)
          done()
        })
    })
  })

  // Test for the /login route
  xdescribe('POST /login', () => {
    it('should log in a user', done => {
      chai
        .request(app)
        .post('/api/login')
        .send({
          username: 'testuser',
          password: 'password'
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('token')
          done()
        })
    })
  })

  // Test for the /users route
  xdescribe('GET /users', () => {
    it('should get all users', done => {
      chai
        .request(app)
        .get('/api/users')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })
  })

  // Test for the /users/:id route
  xdescribe('GET /users/:id', () => {
    it('should get a specific user', done => {
      const userId = 3 // Replace with an existing user ID in your database
      chai
        .request(app)
        .get(`/api/users/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          done()
        })
    })
  })

  // Test for the /users/:id route
  xdescribe('PUT /users/:id', () => {
    let token
    before(done => {
      chai
        .request(app)
        .post('/api/login')
        .send({
          username: 'testuser',
          password: 'password'
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          token = res.body.token
          done()
        })
    })

    it('should update a user', done => {
      const userId = 3 // Replace with an existing user ID in your database
      chai
        .request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `${token}`)
        .send({
          email: 'newemail@example.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(204)
          done()
        })
    })
  })

  // Test for the /users/:id route
  xdescribe('DELETE /users/:id', () => {
    let token
    before(done => {
      chai
        .request(app)
        .post('/api/login')
        .send({
          username: 'testuser',
          password: 'password'
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          token = res.body.token
          done()
        })
    })

    it('should delete a user', done => {
      const userId = 3 // Replace with an existing user ID in your database
      chai
        .request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body)
            .to.have.property('message')
            .to.equal('User deleted successfully')
          done()
        })
    })
  })
})
