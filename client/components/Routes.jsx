import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../configureStore';
import {Provider} from 'react-redux';
import App from './App';
import Home from './Home';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import NotFoundPage from './NotFoundPage';
import Profile from './Profile';
import MyBooks from './MyBooks';
import TradingArea from './TradingArea';

export default class Routes extends React.Component {

  render() {
  	const store = configureStore({});
  	const history = syncHistoryWithStore(browserHistory, store);

  	var requireAuth = function(nextState, replace) {
    	let { auth } = store.getState().reducer;
    	if (!auth.isAuthenticated) {
    		replace({
		      pathname: '/login'
		    })
    	}
  	}

  	const routes = (
		  <Route path="/" component={App}>
		    <IndexRoute component={Home}/>
		    <Route path="login" component={LoginForm}/>
        <Route path="signup" component={SignupForm}/>
        <Route path="mybooks" component={MyBooks} onEnter={requireAuth}/>
        <Route path="profile" component={Profile} onEnter={requireAuth}/>
        <Route path="trading" component={TradingArea} onEnter={requireAuth}/>
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