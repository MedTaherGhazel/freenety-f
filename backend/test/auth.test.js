const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
chai.should()

describe('Authentication', () => {
  describe('POST /api/login', () => {
    it('should return a JWT token on successful login', done => {
      chai
        .request(app)
        .post('/api/login')
        .send({
          username: 'demo_user',
          password: 'demo_password'
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('token')
          done()
        })
    })
  })
})
