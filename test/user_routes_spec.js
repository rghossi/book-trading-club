import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/index';
import User from '../server/models/user';

chai.use(chaiHttp);
const should = chai.should();
const agent = chai.request.agent(server);

describe('routes : users', () => {

  beforeEach((done) => {
    User.remove({}, function(err) { 
      if (err) throw err;
      done();
    });
  });

	const newUserData = {
    email: 'a@test.com',
    password: 'user_password',
    name: 'New Test User'
  };

  describe('POST /api/users/new', () => {
  	it ('should create new user and return it', (done) => {
  		chai.request(server)
  		.post('/api/users/new')
  		.send({user: newUserData})
  		.end((err, res) => {
  			if (err) throw err;
		    res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('_id');
				res.body.should.have.property('name');
				res.body.should.have.property('email');
				res.body.name.should.equal(newUserData.name);
				res.body.email.should.equal(newUserData.email);
				should.not.exist(res.body.password);
				should.not.exist(res.body.passwordSalt);
				done();
  		})
  	})

    it("should not create if email already exists", function(done) {
      chai.request(server)
      .post('/api/users/new')
      .send({user: newUserData})
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.name.should.equal(newUserData.name);
        res.body.email.should.equal(newUserData.email);
        should.not.exist(res.body.password);
        should.not.exist(res.body.passwordSalt);
        chai.request(server)
        .post('/api/users/new')
        .send({user: newUserData})
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          should.not.exist(res.body._id);
          should.not.exist(res.body.email);
          should.not.exist(res.body.password);
          should.not.exist(res.body.passwordSalt);
          done();
        })
      })
    })
  })

  describe('POST /api/login', () => {
    it ('should login user', (done) => {
      User.createNew(newUserData, function(err, user){
        if (err) throw err;
        chai.request(server)
        .post('/api/login')
        .send({email: newUserData.email, password: newUserData.password})
        .end((err, res) => {
          if (err) throw err;
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          should.not.exist(res.body.user.password);
          should.not.exist(res.body.user.passwordSalt);
          done();
        })
      });
    })

    it ('should fail for non-existent users', (done) => {
      chai.request(server)
      .post('/api/login')
      .send({email: newUserData.email, password: newUserData.password})
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.not.have.property('user');
        done();
      });
    })

    it ('should fail for wrong email', (done) => {
      User.createNew(newUserData, function(err, user){
        if (err) throw err;
        chai.request(server)
        .post('/api/login')
        .send({email: "a@b.com", password: newUserData.password})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.not.have.property('user');
          done();
        })
      });
    })

    it ('should fail for wrong password', (done) => {
      User.createNew(newUserData, function(err, user){
        if (err) throw err;
        chai.request(server)
        .post('/api/login')
        .send({email: newUserData.email, password: "12345"})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.not.have.property('user');
          done();
        })
      });
    })
  })

  describe('GET /api/logout', () => {
    it ('should logout user', (done) => {
      User.createNew(newUserData, function(err, user){
        if (err) throw err;
        agent
        .post('/api/login')
        .send({email: newUserData.email, password: newUserData.password})
        .end((err, res) => {
          if (err) throw err;
          agent
          .get('/api/logout')
          .end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.not.have.property('user');
            res.body.should.have.property('message');
            done();
          })
        })
      });
    })

    it ('should fail when user is not logged in', (done) => {
      chai.request(server)
      .get('/api/logout')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.should.not.have.property('user');
        done();
      });
    })

  })

  describe('PUT /api/users/:userId', () => {
    it ('should update user and return it updated', (done) => {
      User.createNew(newUserData, function(err, user){
        agent
        .post('/api/login')
        .send({email: newUserData.email, password: newUserData.password})
        .end((err, res) => {
          if (err) throw err;
          agent
          .put('/api/users/' + user._id)
          .send({user: {
            name: "Rafael",
            email: "rafael.ghossi@gmail.com",
            city: "Campos",
            state: "RJ"
          }})
          .end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('object');
            res.body.should.have.property('_id');
            res.body.name.should.equal("Rafael");
            res.body.email.should.equal("rafael.ghossi@gmail.com");
            res.body.city.should.equal("Campos");
            res.body.state.should.equal("RJ");
            should.not.exist(res.body.password);
            should.not.exist(res.body.passwordSalt);
            done();
          })
        })
      });
    })

    it ('should not update when user is not logged in', (done) => {
      User.createNew(newUserData, function(err, user){
        agent
        .put('/api/users/' + user._id)
        .send({user: {
          name: "Rafael",
          email: "rafael.ghossi@gmail.com",
          city: "Campos",
          state: "RJ"
        }})
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.not.have.property('user');
          done();
        })
      });
    })
  })
});