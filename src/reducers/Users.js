import * as types from '../actions/types';

const initialState = {
  init: true,
  isFetching: false,
  isFetched: false,
  errorMessage: false,
  isFailure: false,
  value: []
};

const actionType = types.GET_USERS;

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    case actionType.INIT:
      return Object.assign({}, state, {
        init: true,
        isFetched: false,
        errorMessage: false,
        isFailure: false,
        value: []
      });
    case actionType.SUCCESS:
      return Object.assign({}, state, {
        init: false,
        isFetched: true,
        isFailure: false,
        errorMessage: false,
        value: action.payload,
      });
    case actionType.FAILURE:
      return Object.assign({}, state, {
        init: false,
        isFetched: false,
        failure: true,
        errorMessage: action.payload,
      });
    default:
      return state;
  }
}