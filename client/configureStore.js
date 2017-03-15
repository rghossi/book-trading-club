import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import reducer from './reducer';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const loggerMiddleware = createLogger();
const middleware = routerMiddleware(browserHistory)

export default function configureStore(preLoadedState) {
	return createStore(combineReducers({
			reducer,
			routing: routerReducer
		}), preLoadedState, 
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware,
			middleware
		)
	)
}