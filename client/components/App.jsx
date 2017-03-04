import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid>
        	Hello!
        </Grid>
        <Footer />
      </div>
    );
  }
}