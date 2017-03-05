import { SET_STATE } from './actions';

function setState(state, newState) {
  return Object.assign({}, state, newState);
}