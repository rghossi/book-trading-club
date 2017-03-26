import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Profile extends Component {
  render() {
    return (
      <div>
        Profile!
      </div>
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