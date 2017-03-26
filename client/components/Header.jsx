import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
  	const user = this.props.user;
    return (
      <Navbar fixedTop>
		    <Navbar.Header>
		      <Link to="/" className="link"><i className="fa fa-book"></i></Link>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
			    <Nav pullRight>
			    	{!user && <NavItem componentClass="span"><Link className="link" to="/login">Login</Link></NavItem>}
			    	{!user && <NavItem componentClass="span"><Link className="link" to="/signup">Signup</Link></NavItem>}
			    	{user && <NavItem componentClass="span"><Link className="link" to="/logout">Logout</Link></NavItem>}
			    </Nav>
		    </Navbar.Collapse>
		  </Navbar>
    );
  }
}

Header.propTypes = {
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

export default connect(mapStateToProps)(Header)