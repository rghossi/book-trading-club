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

  const newBookData = {
    name: "Dummy book",
    author: "me",
    isbn: "1269312879",
    coverUrl: "http://hahahahahueheueh.com.br"
  };

	before((done) => {
		User.createNew(newUserData, function(err, user){
			if (err.code !== 11000) throw err;
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
      agent
	      .post('/api/login')
	      .send({email: newUserData.email, password: newUserData.password})
	      .end((err, res) => {
	      	done();
	      })
    });
  });

  afterEach((done) => {
  	agent
	    .get('/api/logout')
	    .end((err, res) => {
	      if (err) throw err;
	      done();
	    })
  })

  describe('POST /api/books/new', () => {
  	it ('should add new book and return it', (done) => {
  		agent
        .post('/api/books/new')
        .send({book: newBookData})
        .end((err, res) => {
        	if (err) throw err;
        		res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('book');
            const book = res.body.book;
            book.should.have.property('_id');
            book.name.should.equal(newBookData.name);
            book.author.should.equal(newBookData.author);
            book.isbn.should.equal(newBookData.isbn);
            book.coverUrl.should.equal(newBookData.coverUrl);
            should.exist(book.owner);
            done();
        })
  	})

  	it ('should not add new book if user is not logged in', (done) => {
  		chai.request(server)
        .post('/api/books/new')
        .send({book: newBookData})
        .end((err, res) => {
      		res.should.have.status(401);
          res.body.should.be.an('object');
          should.not.exist(res.body.book);
          done();
        })
  	})
  })
})