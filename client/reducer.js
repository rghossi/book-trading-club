import { combineReducers } from 'redux';
import { SET_STATE, SIGNUP_REQUEST, SIGNUP_SUCCESS, 
  SIGNUP_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, 
  LOGIN_ERROR } from './actions';

function setState(state, newState) {
  return Object.assign({}, state, newState);
}

function auth(state = {
    isFetching: false,
    isAuthenticated: false,
    didInvalidate: false
  }, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        didInvalidate: false
      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        didInvalidate: false,
        user: action.user
      })
    case SIGNUP_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        didInvalidate: true
      })
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        didInvalidate: false
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        didInvalidate: false,
        user: action.user
      })
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        didInvalidate: true
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
	setState,
  auth
})

export default rootReducer