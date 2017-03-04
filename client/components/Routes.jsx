import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import App from './App';
import Home from './Home';
import LoginForm from './LoginForm';
import NotFoundPage from './NotFoundPage';

export default class Routes extends React.Component {
  render() {
  	const routes = (
		  <Route path="/" component={App}>
		    <IndexRoute component={Home}/>
		    <Route path="login" component={LoginForm}/>
		    <Route path="*" component={NotFoundPage}/>
		  </Route>
		);
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}