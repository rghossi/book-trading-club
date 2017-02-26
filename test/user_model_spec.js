import chai from 'chai';
import server from '../server/index';
import User from '../server/models/user';
import mongoose from 'mongoose';

const should = chai.should();

describe('User model', function() {

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

  describe('createNew', function() {
    it("should create new user", function(done) {
      User.createNew(newUserData, function(err, user) {
        if (err) throw err;

        user.should.have.property('_id');
        user.should.have.property('email');
        user.should.have.property('password');
        user.should.have.property('passwordSalt');
        user.name.should.equal(newUserData.name);
        user.email.should.equal(newUserData.email);
        user.password.should.not.equal(newUserData.password);
        done();
      })
    })

    it("should not create if email already exists", function(done) {
      User.createNew(newUserData, function(err, user) {
        if (err) throw err;
        should.not.exist(err);
        should.exist(user);
        User.createNew(newUserData, function(err2, user2) {
          should.exist(err2);
          should.not.exist(user2);
          done();
        })
      });
    })
  })

});