import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import { routerReducer } from 'react-router-redux';

const loggerMiddleware = createLogger();

export default function configureStore(preLoadedState) {
	return createStore(combineReducers({
			reducer,
			routing: routerReducer
		}), preLoadedState, 
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	)
}