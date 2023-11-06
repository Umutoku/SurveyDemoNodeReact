import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const should = chai.should();

chai.use(chaiHttp);

describe('Users API Interface', function() {
  let token; 
  let userId = '';

  // Yeni kullanıcı kaydı
  it('should create a user on /users/register POST', function(done) {
    chai.request(app)
      .post('/users/register')
      .send({
        'username': 'testuser11',
        'email': 'testuser11@example.com',
        'password': 'password123'
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        } else {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          userId = res.body.user; // userId'yi global değişkene ata
          done();
        }
      });
  });

  // // Kullanıcı girişi
  it('should login a user and return a token on /users/login POST', function(done) {
    chai.request(app)
      .post('/users/login')
      .send({
        'username': 'testuser11',
        'password': 'password123'
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        } else {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Logged in successfully 😊 👌');
          res.body.should.have.property('token');
          token = res.body.token; // token'ı global değişkene ata
          done();
        }
      });
  });


  // Tüm kullanıcıların listesi
  it('should get all users on /users/ GET', function(done) {
    chai.request(app)
      .get('/users/')
      .set('Cookie', `jwt=${token}`) // token'ı cookie olarak gönder
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        } else {
          res.should.have.status(200);
          res.body.users.should.be.a('array'); // users dizisini kontrol et
          done();
        }
      });
  });  
    


  // Kullanıcı silme
  it('should delete a user on /users/:id DELETE', function(done) {
    chai.request(app)
      .delete(`/users/${userId}`)
      .set('cookie', `jwt=${token}`)  // token'ı cookie olarak gönder
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        } else {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('User deleted successfully');
          done();
        }
      });
  });

});
