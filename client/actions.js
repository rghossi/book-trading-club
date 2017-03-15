import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

export const SET_STATE = 'SET_STATE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
// export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
// export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
// export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export function setState(state) {
  return {
    type: SET_STATE,
    state
  };
}

function requestSignup(user) {
  return {
    type: SIGNUP_REQUEST,
    user
  }
}

function successSignup(user) {
  return {
    type: SIGNUP_SUCCESS,
    user
  }
}

function errorSignup() {
  return {
    type: SIGNUP_ERROR
  }
}

export function signup(user) {
  return function (dispatch) {
    dispatch(requestSignup(user));
    return fetch("/api/users/new", {
    	credentials: 'same-origin',
    	method: 'POST',
    	headers: {  
        "Content-Type": "application/json"
      },
    	body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then(json => {
    	if (json.message){
    		dispatch(errorSignup())
    	} else {
      	dispatch(successSignup(json))
        dispatch(push('/'));
    	}
    })
  }
}

function requestLogin(user) {
  return {
    type: LOGIN_REQUEST,
    user
  }
}

function successLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

function errorLogin() {
  return {
    type: LOGIN_ERROR
  }
}

export function login(user) {
  return function (dispatch) {
    dispatch(requestLogin(user));
    return fetch("/api/login", {
      credentials: 'same-origin',
      method: 'POST',
      headers: {  
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(json => {
      if (json.message){
        dispatch(errorLogin())
      } else {
        dispatch(successLogin(json))
        dispatch(push('/'));
      }
    })
  }
}