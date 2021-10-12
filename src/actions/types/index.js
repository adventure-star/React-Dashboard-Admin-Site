const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const RECEIVED = 'RECEIVED';
const INIT     = 'INIT';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, RECEIVED, INIT].forEach(type => res[type] = `${base}_${type}`);
  return res;
}

export const LOGIN = createRequestTypes('@dashboard/LOGIN');
export const SIGNUP = createRequestTypes('@dashboard/SIGNUP');
export const GET_USERS = createRequestTypes('@dashboard/GET_USERS');

export const SET_USER = '@dashboard/SET_USER';
