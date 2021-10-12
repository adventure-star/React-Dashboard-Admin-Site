import { jsonQuery, query, setLocalToken } from './common';

export async function signupWithAPI(data) {
  return await jsonQuery(`/auth/register/`, 'POST', data, false);
}

export async function loginWithAPI(data) {
  const res = await jsonQuery(`/auth/login/`, 'POST', data, false);
  setLocalToken(JSON.stringify(res));
  return res;
}

export async function logoutWithAPI(data) {
  return await query(`/auth/logout/`, {method: 'POST'});
}
