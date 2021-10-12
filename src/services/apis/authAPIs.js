import common from '../common';

export const signUp = async (data) => {
  return await common.processRequest(`/auth/email/registration/`, 'post', data, handleResponse);
};

export const login = async (data) => {
  return await common.processRequest(`/auth/email/login/`, 'post', data);
};

export default AuthAPI;