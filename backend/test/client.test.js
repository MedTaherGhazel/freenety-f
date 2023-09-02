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

xdescribe('Client Routes test', () => {
  // Login and get token before running tests
  beforeEach(done => {
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
        done()
      })
  })

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
    const clientId = getClientIdFromUserId(req.user.id)
    const data = {
      company_name: 'ESPRIT',
      membership_type: 'PREMIUM'
    }
    chai
      .request(app)
      .put(`/api/clients/${clientId}`)
      .set('Authorization', `${token}`)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(204)
        done()
      })
  })
})

async function getClientIdFromUserId (userId) {
  // Get the client from the Clients table where user_id = userId
  const client = await sequelize.query(
    'SELECT id FROM clients WHERE user_id = ?',
    {
      replacements: [userId]
    }
  )

  // Return the client ID
  return client[0].id
}
