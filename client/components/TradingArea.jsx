import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, 
  FormControl, Button, InputGroup,
  ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { getAllBooks } from '../actions';

class TradingArea extends Component {
  constructor(){
    super();
    this.state = {
      theirBook: undefined,
      myBook: undefined
    }
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(getAllBooks(user._id));
  }

  requestTrade(bookRequested) {
    this.setState({theirBook: bookRequested});
  }

  offerBook(mybook) {
    this.setState({myBook: mybook});
  }

  sendTradeRequest() {
    console.log(this.state);
    this.reset();
  }

  reset() {
    this.setState({theirBook: undefined, myBook: undefined});
  }

  render() {
  	let { user, isFetching, books, availableBooks } = this.props;
    let { myBook, theirBook } = this.state
    return (
      <div className="text-center">
      {theirBook && <div>
        <Button onClick={() => this.reset()}>Start over</Button>
      </div>}
      { !theirBook && <Row>
        <h3 className="text-center">Click on any book to request a trade!</h3>
        <ListGroup>
          {availableBooks && availableBooks.map((book) => 
            <a href="#" onClick={() => this.requestTrade(book)} className="book-covers">
              <img className="book-covers" key={book._id} src={book.coverUrl} />
            </a>
          )}
        </ListGroup>
      </Row>}
      { !myBook && <Row>
        <h3 className="text-center">Which one of your books you wanna offer?</h3>
        <ListGroup>
          {books && books.map((book) => 
            <a href="#" onClick={() => this.offerBook(book)} className="book-covers">
              <img className="book-covers" key={book._id} src={book.coverUrl} />
            </a>
          )}
        </ListGroup>
      </Row>}
      {myBook && theirBook && <div><Row>
        <img className="book-covers" key={theirBook._id} src={theirBook.coverUrl} />
        <img className="book-covers" key={myBook._id} src={myBook.coverUrl} />
      </Row>
      <Button onClick={() => this.sendTradeRequest()}>Send Trade Request</Button></div>}
      </div>
    );
  }
}

TradingArea.propTypes = {
  user: PropTypes.object,
  didInvalidate: PropTypes.bool,
  isFetching: PropTypes.bool,
  books: PropTypes.array,
  availableBooks: PropTypes.array
}

function mapStateToProps(state) {
  const { auth, bookHandler } = state.reducer
  if (auth && auth.user) {
    const { user } = auth
    const { didInvalidate, isFetching, books, availableBooks } = bookHandler
  	return { user, didInvalidate, isFetching, books, availableBooks };
  } else {
  	return { "didInvalidate": true };
  }
}

export default connect(mapStateToProps)(TradingArea)