import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <Navbar fixedTop>
		    <Navbar.Header>
		      <Link to="/" className="link"><i className="fa fa-book"></i></Link>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
			    <Nav pullRight>
			    	<NavItem componentClass="span"><Link className="link" to="/login">Login</Link></NavItem>
			    </Nav>
		    </Navbar.Collapse>
		  </Navbar>
    );
  }
}