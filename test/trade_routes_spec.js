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

  describe('PUT /api/trades/accept', () => {
    it('should change trade status from "sent" to "accepted"', (done) => {
      let book1 = new Book(myBook);
      let book2 = new Book(hisBook);
      book1.owner = myId;
      book2.owner = hisId;
      book1.save((err, myBook) => {
        book2.save((err, hisBook) => {
          let trade = new Trade({mine: myBook._id, theirs: hisBook._id})
          trade.save((err, trade) => {
            agent
            .get('/api/logout')
            .end((err, res) => {
              agent
              .post('/api/login')
              .send({email: him.email, password: him.password})
              .end((err, res) => {
                agent
                .put('/api/trades/accept')
                .send({tradeId: trade._id})
                .end((err, res) => {
                  if (err) throw err;
                  res.should.have.status(200);
                  res.body.should.be.an('object');
                  res.body.should.have.property('trade');
                  const trade = res.body.trade;
                  trade.should.have.property('_id');
                  should.exist(trade.mine);
                  should.exist(trade.theirs);
                  trade.status.should.equal("accepted");
                  Book.findById(myBook._id, (err, book) => {
                    book.didTrade.should.equal(true);
                    Book.findById(hisBook._id, (err, book2) => {
                      book2.didTrade.should.equal(true);
                      done();
                    })
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should not change status if wrong user is loggedIn', (done) => {
      let book1 = new Book(myBook);
      let book2 = new Book(hisBook);
      book1.owner = myId;
      book2.owner = hisId;
      book1.save((err, myBook) => {
        book2.save((err, hisBook) => {
          let trade = new Trade({mine: myBook._id, theirs: hisBook._id})
          trade.save((err, trade) => {
            agent
            .put('/api/trades/accept')
            .send({tradeId: trade._id})
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.an('object');
              res.body.should.not.have.property('trade');
              Book.findById(myBook._id, (err, book) => {
                if (book.didTrade) book.didTrade.should.equal(false);
                Book.findById(hisBook._id, (err, book2) => {
                  if (book2.didTrade) book2.didTrade.should.equal(false);
                  done();
                })
              })
            })
          })
        })
      })
    })
  })

  describe('PUT /api/trades/decline', () => {
    it('should change trade status from "sent" to "declined"', (done) => {
      let book1 = new Book(myBook);
      let book2 = new Book(hisBook);
      book1.owner = myId;
      book2.owner = hisId;
      book1.save((err, myBook) => {
        book2.save((err, hisBook) => {
          let trade = new Trade({mine: myBook._id, theirs: hisBook._id})
          trade.save((err, trade) => {
            agent
            .get('/api/logout')
            .end((err, res) => {
              agent
              .post('/api/login')
              .send({email: him.email, password: him.password})
              .end((err, res) => {
                agent
                .put('/api/trades/decline')
                .send({tradeId: trade._id})
                .end((err, res) => {
                  if (err) throw err;
                  res.should.have.status(200);
                  res.body.should.be.an('object');
                  res.body.should.have.property('trade');
                  const trade = res.body.trade;
                  trade.should.have.property('_id');
                  should.exist(trade.mine);
                  should.exist(trade.theirs);
                  trade.status.should.equal("declined");
                  Book.findById(myBook._id, (err, book) => {
                    if (book.didTrade) book.didTrade.should.equal(false);
                    Book.findById(hisBook._id, (err, book2) => {
                      if (book2.didTrade) book2.didTrade.should.equal(false);
                      done();
                    })
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should not change status if wrong user is loggedIn', (done) => {
      let book1 = new Book(myBook);
      let book2 = new Book(hisBook);
      book1.owner = myId;
      book2.owner = hisId;
      book1.save((err, myBook) => {
        book2.save((err, hisBook) => {
          let trade = new Trade({mine: myBook._id, theirs: hisBook._id})
          trade.save((err, trade) => {
            agent
            .put('/api/trades/decline')
            .send({tradeId: trade._id})
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.an('object');
              res.body.should.not.have.property('trade');
              Book.findById(myBook._id, (err, book) => {
                if (book.didTrade) book.didTrade.should.equal(false);
                Book.findById(hisBook._id, (err, book2) => {
                  if (book2.didTrade) book2.didTrade.should.equal(false);
                  done();
                })
              })
            })
          })
        })
      })
    })
  })
})