import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			city: "",
			state: ""
		}
	}

	componentDidMount() {
		const { user } = this.props;
		if (user.name) this.setState({name: user.name})
		if (user.city) this.setState({city: user.city})
		if (user.state) this.setState({state: user.state})
	}

	handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }

  handleStateChange(e) {
    this.setState({ state: e.target.value });
  }

  handleSubmit(e) {
  	e.preventDefault();
  	console.log(this.state);
  }

  render() {
  	let { user } = this.props;
    return (
      <Row>
        <Col sm={6} smOffset={3} lg={4} lgOffset={4}> 
          <form onSubmit={this.handleSubmit.bind(this)}>
          	<FormGroup controlId="formBasicText">
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange.bind(this)}
              />
            </FormGroup>
            <FormGroup controlId="formBasicText" >
              <ControlLabel>City</ControlLabel>
              <FormControl
                type="text"
                value={this.state.city}
                onChange={this.handleCityChange.bind(this)}
              />
            </FormGroup>
            <FormGroup controlId="formBasicText">
              <ControlLabel>State</ControlLabel>
              <FormControl
                type="text"
                value={this.state.state}
                onChange={this.handleStateChange.bind(this)}
              />
            </FormGroup>
            <Button type="submit">
    		      Save
    		    </Button>
          </form>
        </Col>
      </Row>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object
}

function mapStateToProps(state) {
  const { auth } = state.reducer
  if (auth && auth.user) {
  	const { user } = auth
  	return { user };
  } else {
  	return {};
  }
}

export default connect(mapStateToProps)(Profile)