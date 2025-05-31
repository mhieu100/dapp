import axios from './axios-customize';

/**
 *
Module Auth
 */

export const callRegister = (
  walletAddress,
  fullname,
  email,
) => {
  return axios.post('/auth/register', {
    walletAddress,
    fullname,
    email
  });
};

export const callLogin = (walletAddress) => {
  return axios.post('/auth/login', { walletAddress });
};

export const callFetchAccount = () => {
  return axios.get('/auth/account');
};

export const callLogout = () => {
  return axios.post('/auth/logout');
};

export const callMyAppointments = () => {
  return axios.get('/auth/my-appointments');
};


// export const callRefreshToken = () => {
//   return axios.get('/auth/refresh');
// };



