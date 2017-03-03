import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/index';
import User from '../server/models/user';
import Book from '../server/models/book';
import Trade from '../server/models/trade';

chai.use(chaiHttp);
const should = chai.should();
const agent = chai.request.agent(server);

describe('routes : trades', () => {

  const me = {
    email: 'a@test.com',
    password: 'user_password',
    name: 'New A Test User'
  };

  const him = {
    email: 'b@test.com',
    password: 'user_password_b',
    name: 'New B Test User'
  };

  const myBook = {
    name: "Dummy book",
    author: "me",
    isbn: "1269312879",
    coverUrl: "http://hahahahahueheueh.com.br"
  };

  const hisBook = {
    name: "Not dummy book",
    author: "him",
    isbn: "126931287910",
    coverUrl: "http://lalaland.com.br"
  };

  let myId;
  let hisId;

  before((done) => {
    User.createNew(me, function(err, myUser){
      User.createNew(him, function(err2, hisUser){
        if (err || err2) console.log(err, err2);
        myId = myUser._id;
        hisId = hisUser._id;
        done();
      })
    })
  });

  beforeEach((done) => {
    agent
    .post('/api/login')
    .send({email: me.email, password: me.password})
    .end((err, res) => {
      done();
    })
  });

  after((done) => {
    User.remove({}, function(err) { 
      if (err) throw err;
      done();
    });
  });

  afterEach((done) => {
    agent
    .get('/api/logout')
    .end((err, res) => {
      Book.remove({}, function(err) { 
        Trade.remove({}, function(err) {
          done();
        })
      });
    })
  })

  describe('POST /api/books/trade', () => {
    it ('should send new trade request', (done) => {
      let book1 = new Book(myBook);
      let book2 = new Book(hisBook);
      book1.save((err, myBook) => {
        book2.save((err, hisBook) => {
          agent
          .post('/api/books/trade')
          .send({mine: myBook._id, theirs: hisBook._id})
          .end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('trade');
            const trade = res.body.trade;
            trade.should.have.property('_id');
            should.exist(trade.mine);
            should.exist(trade.theirs);
            trade.status.should.equal("sent");
            done();
          })
        })
      })
    })

    it ('should not send if user is not authenticated', (done) => {
      let book1 = new Book(myBook);
      let book2 = new Book(hisBook);
      book1.save((err, myBook) => {
        book2.save((err, hisBook) => {
          chai.request(server)
          .post('/api/books/trade')
          .send({mine: myBook._id, theirs: hisBook._id})
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.an('object');
            res.body.should.not.have.property('trade');
            done();
          })
        })
      })
    })

    it ('should not send if book does not exist', (done) => {
      let book1 = new Book(myBook);
      let book2 = new Book(hisBook);
      book1.save((err, myBook) => {
        book2.save((err, hisBook) => {
          Book.remove({}, (err) => {
            agent
            .post('/api/books/trade')
            .send({mine: myBook._id, theirs: hisBook._id})
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.an('object');
              res.body.should.not.have.property('trade');
              res.body.should.have.property('message');
              done();
            })
          })
        })
      })
    })
  })
})