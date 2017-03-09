import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

export default class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		}
	}

	getEmailValidationState() {
		const email = this.state.email;
		if (email.length > 0) return "success";
		else if (email.length === 0) return null;
		return null;
	}

	getPasswordValidationState() {
		const length = this.state.password.length;
    if (length > 0) return "success";
    else if (length === 0) return null;
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
  	console.log(this.state);
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
            </FormGroup>
            <Button type="submit" disabled={this.getEmailValidationState() !== "success" || this.getPasswordValidationState() !== "success"}>
    		      Login
    		    </Button>
          </form>
        </Col>
      </Row>
    );
  }
}