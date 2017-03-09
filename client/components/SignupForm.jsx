import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import { signup } from '../actions';

class SignupForm extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		}
	}

	getEmailValidationState() {
		const email = this.state.email;
		if (email.length > 3 && email.indexOf('@') !== -1) return 'success';
		else if (email.length === 0) return null;
		else if (email.indexOf('@') === -1) return 'error';
		return null;
	}

	getPasswordValidationState() {
		const length = this.state.password.length;
    if (length > 5) return 'success';
    else if (length > 0) return 'error';
    return null;
	}

	handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
  	e.preventDefault();
  	const { dispatch } = this.props;
    const { email, password } = this.state;
    let user = {};
    user.email = email;
    user.password = password;
    dispatch(signup(user));
  }

  render() {
    return (
      <Row>
        <Col sm={6} smOffset={3} lg={4} lgOffset={4}> 
          <form onSubmit={this.handleSubmit.bind(this)}>
          	<FormGroup
              controlId="formBasicText"
              validationState={this.getEmailValidationState()}
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="email"
                value={this.props.email}
                onChange={this.handleEmailChange.bind(this)}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getPasswordValidationState()}
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                value={this.props.password}
                onChange={this.handlePasswordChange.bind(this)}
              />
              <FormControl.Feedback />
              <HelpBlock>Must have more than 5 characteres.</HelpBlock>
            </FormGroup>
            <Button type="submit" disabled={this.getEmailValidationState() !== "success" || this.getPasswordValidationState() !== "success"}>
    		      Signup
    		    </Button>
          </form>
        </Col>
      </Row>
    );
  }
}

export default connect()(SignupForm)