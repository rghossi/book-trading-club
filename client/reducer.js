import { combineReducers } from 'redux';
import { SET_STATE, SIGNUP_REQUEST, SIGNUP_SUCCESS, 
  SIGNUP_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, 
  LOGIN_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, 
  LOGOUT_ERROR, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, 
  UPDATE_USER_ERROR, MYBOOKS_REQUEST, MYBOOKS_SUCCESS, 
  MYBOOKS_ERROR } from './actions';

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
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
        didInvalidate: false
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        didInvalidate: false,
        user: undefined
      })
    case LOGOUT_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        didInvalidate: true
      })
    case UPDATE_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
        didInvalidate: false
      })
    case UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        didInvalidate: false,
        user: action.user
      })
    default:
      return state;
  }
}

function bookHandler(state = {}, action) {
  switch (action.type) {
    case MYBOOKS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case MYBOOKS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        books: action.books
      })
    case MYBOOKS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
	setState,
  auth,
  bookHandler
})

export default rootReducer