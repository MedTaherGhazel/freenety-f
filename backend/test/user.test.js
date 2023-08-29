const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
chai.should()

xdescribe('user safe resuests', () => {
  let token;

  before(done => {
    chai
      .request(app)
      .post('/api/login')
      .send({ username: 'demo_user', password: 'demo_password' })
      .end((err, res) => {
        res.should.have.status(200)
        token = res.body.token;
        done();
      });
  });

  describe('GET /api/users', () => {
    it('should return all users', done => {
      chai
        .request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('array')
          done()
        })
    })
  })

  //TODO: Add more test cases for other CRUD operations (PUT, DELETE)
  describe('GET /api/users/:id', () => {
    it('should return a user by id', done => {
      const userId = 1; // Replace with a valid user ID from your database

      chai
        .request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          // Additional assertions for the returned user data

          done();
        });
    });

    it('should return an error for invalid id', done => {
      const invalidId = 999; // Replace with an invalid user ID

      chai
        .request(app)
        .get(`/api/users/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          // Additional assertions for the error response

          done();
        });
    });
  });



})

// Test updating user details
xdescribe('Update User Details', () => {
  let token;

  before((done) => {
    // Log in the user and get the token
    const credentials = {
      username: 'demo_user',
      password: 'demo_password'
    };

    chai.request(app)
      .post('/api/login')
      .send(credentials)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('should update user details', (done) => {
    const updatedDetails = {
      username: 'new_username',
      email: 'new_email@example.com'
    };

    chai.request(app)
      .put('/api/users/:id')
      .set('Authorization', token)
      .send(updatedDetails)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});
