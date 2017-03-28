import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

export const SET_STATE = 'SET_STATE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const MYBOOKS_REQUEST = 'MYBOOKS_REQUEST';
export const MYBOOKS_SUCCESS = 'MYBOOKS_SUCCESS';
export const MYBOOKS_ERROR = 'MYBOOKS_ERROR';
export const ADD_NEW_BOOK_REQUEST = 'ADD_NEW_BOOK_REQUEST';
export const ADD_NEW_BOOK_SUCCESS = 'ADD_NEW_BOOK_SUCCESS';
export const ADD_NEW_BOOK_ERROR = 'ADD_NEW_BOOK_ERROR';

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
        dispatch(successLogin(json.user))
        dispatch(push('/'));
      }
    })
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST
  }
}

function successLogout() {
  return {
    type: LOGOUT_SUCCESS
  }
}

function errorLogout() {
  return {
    type: LOGOUT_ERROR
  }
}

export function logout() {
  return function (dispatch) {
    dispatch(requestLogout());
    return fetch("/api/logout", {
      credentials: 'same-origin',
      method: 'GET',
      headers: {  
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      dispatch(successLogout())
      dispatch(push('/'));
    })
  }
}

function requestUpdateUser(user) {
  return {
    type: UPDATE_USER_REQUEST
  }
}

function successUpdateUser(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    user
  }
}

function errorUpdateUser() {
  return {
    type: UPDATE_USER_ERROR
  }
}

export function updateUser(newUser, userId) {
  return function (dispatch) {
    dispatch(requestUpdateUser());
    return fetch("/api/users/" + userId, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: {  
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"user": newUser})
    })
    .then(response => response.json())
    .then(json => {
      if (json.message){
        dispatch(errorUpdateUser())
      } else {
        dispatch(successUpdateUser(json))
        alert("Profile changes saved!")
      }
    })
  }
}

function requestMyBooks(user) {
  return {
    type: MYBOOKS_REQUEST
  }
}

function successMyBooks(books) {
  return {
    type: MYBOOKS_SUCCESS,
    books
  }
}

function errorMyBooks() {
  return {
    type: MYBOOKS_ERROR
  }
}

export function getMyBooks(userId) {
  return function (dispatch) {
    dispatch(requestMyBooks());
    return fetch("/api/books", {
      credentials: 'same-origin',
      method: 'GET',
      headers: {  
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.message){
        dispatch(errorMyBooks())
      } else {
        let mybooks = json.books.filter((book) => String(book.owner) === String(userId))
        dispatch(successMyBooks(mybooks))
      }
    })
  }
}

function requestAddNewBook(user) {
  return {
    type: ADD_NEW_BOOK_REQUEST
  }
}

function successAddNewBook(book) {
  return {
    type: ADD_NEW_BOOK_SUCCESS,
    book
  }
}

function errorAddNewBook() {
  return {
    type: ADD_NEW_BOOK_ERROR
  }
}

export function addNewBook(bookName, userId) {
  return function (dispatch) {
    dispatch(requestAddNewBook());
    return fetch("/api/books/new", {
      credentials: 'same-origin',
      method: 'POST',
      headers: {  
        "Content-Type": "application/json"
      },
      body: JSON.stringify({bookName})
    })
    .then(response => response.json())
    .then(json => {
      if (json.message){
        dispatch(errorAddNewBook())
      } else {
        dispatch(successAddNewBook(json.book))
        dispatch(getMyBooks(userId))
      }
    })
  }
}