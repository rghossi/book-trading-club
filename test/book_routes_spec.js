import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/index';
import User from '../server/models/user';
import Book from '../server/models/book';

chai.use(chaiHttp);
const should = chai.should();
const agent = chai.request.agent(server);

describe('routes : books', () => {

	const newUserData = {
    email: 'a@test.com',
    password: 'user_password',
    name: 'New Test User'
  };

	before((done) => {
		User.createNew(newUserData, function(err, user){
			if (err) throw err;
      done();
		})
  });

  after((done) => {
		User.remove({}, function(err) { 
      if (err) throw err;
      done();
    });
  });

	beforeEach((done) => {
    Book.remove({}, function(err) { 
      if (err) throw err;
      done();
    });
  });
})