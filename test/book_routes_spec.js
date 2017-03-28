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
			if (err && err.code !== 11000) throw err;
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
        .send({bookName: "Ninja Javascript"})
        .end((err, res) => {
        	if (err) throw err;
        		res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('book');
            const book = res.body.book;
            book.should.have.property('_id');
            book.name.should.equal("Segredos do Ninja JavaScript");
            book.author.should.equal("John Resig");
            book.isbn.should.equal("9788575223284");
            book.coverUrl.should.equal("http://books.google.com/books/content?id=S9NhDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api");
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

  describe('GET /api/books', () => {
  	it ('should get all books', (done) => {
  		agent
        .post('/api/books/new')
        .send({bookName: "The Power of Habit"})
        .end((err, res) => {
        	if (err) throw err;
        	agent
        	.get('/api/books')
        	.end((err, res) => {
        		if (err) throw err;
        		res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('books');
            const books = res.body.books;
            books.length.should.equal(1);
            books[0].name.should.equal("The Power of Habit");
            books[0].author.should.equal("Charles Duhigg");
            books[0].isbn.should.equal("9780679603856");
            books[0].coverUrl.should.equal("http://books.google.com/books/content?id=O1MInVXd_aoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api");
            should.exist(books[0].owner);
            done();
        	})
        })
  	})

  	it ('should not get if user is not authenticated', (done) => {
  		chai.request(server)
        .get('/api/books')
        .end((err, res) => {
      		res.should.have.status(401);
          res.body.should.be.an('object');
          should.not.exist(res.body.books);
          done();
        })
  	})
  })
})