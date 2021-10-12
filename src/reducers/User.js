import * as types from '../actions/types';

const initialState = {
  value: null
};

const actionType = types.SET_USER;

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    case actionType:
      return Object.assign({}, state, {
        value: action.payload
      });
    default:
      return state;
  }
}