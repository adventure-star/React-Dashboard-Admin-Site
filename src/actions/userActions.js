import * as types from './types';

export function getUsers() {
  return {
    type: types.GET_USERS.REQUEST,
  };
}

export function getUsersSuccess(payload) {
  return {
    type: types.GET_USERS.SUCCESS,
    payload,
  };
}

export function getUsersFailed(payload) {
  return {
    type: types.GET_USERS.FAILURE,
    payload,
  };
}

//////////////////////////////////////////////

export function setUser(userInfo) {
  return {
    type: types.SET_USER,
    payload: userInfo,
  };
}