import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, 
  FormControl, Button, InputGroup,
  ListGroup, ListGroupItem } from 'react-bootstrap';
import { updateUser } from '../actions';

class MyBooks extends Component {
	constructor() {
		super();
		this.state = {
			book: "",
		}
	}

	handleBookChange(e) {
    this.setState({ book: e.target.value });
  }

  handleAdd(e) {
  	e.preventDefault();
   //  const { dispatch, user } = this.props;
   //  let book = {};
  	// dispatch(addBook(book));
  }

  render() {
  	let { user, isFetching, books } = this.props;
    return (
      <Row>
        <Col sm={6} smOffset={3} lg={4} lgOffset={4}>
          <form onSubmit={this.handleAdd}>
            <FormGroup>
              <InputGroup>
                <FormControl 
                  type="text"
                  value={this.state.book}
                  placeholder="Book name"
                  onChange={this.handleBookChange.bind(this)}
                />
                <InputGroup.Button>
                  <Button type="submit" disabled={isFetching}>
                    Add
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
          <ListGroup>
            {books && books.map((item) => <ListGroupItem key={book._id}><Img></Img></ListGroupItem>)}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

MyBooks.propTypes = {
  user: PropTypes.object,
  didInvalidate: PropTypes.bool,
  isFetching: PropTypes.bool,
  books: PropTypes.array
}

function mapStateToProps(state) {
  const { auth, bookHandler } = state.reducer
  if (auth && auth.user) {
    const { user } = auth
    const { didInvalidate, isFetching, books } = bookHandler
  	return { user, didInvalidate, isFetching, books };
  } else {
  	return { "didInvalidate": true };
  }
}

export default connect(mapStateToProps)(MyBooks)