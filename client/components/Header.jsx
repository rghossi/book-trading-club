import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Navbar fixedTop>
		    <Navbar.Header>
		      <a href="/"><i className="fa fa-book"></i></a>
		    </Navbar.Header>
		  </Navbar>
    );
  }
}