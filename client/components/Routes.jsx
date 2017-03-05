import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../configureStore';
import {Provider} from 'react-redux';
import App from './App';
import Home from './Home';
import LoginForm from './LoginForm';
import NotFoundPage from './NotFoundPage';

export default class Routes extends React.Component {
  render() {
  	const store = configureStore({});
  	const history = syncHistoryWithStore(browserHistory, store);
  	const routes = (
		  <Route path="/" component={App}>
		    <IndexRoute component={Home}/>
		    <Route path="login" component={LoginForm}/>
		    <Route path="*" component={NotFoundPage}/>
		  </Route>
		);
    return (
    	<Provider store={store}>
      	<Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
      </Provider>
    );
  }
}