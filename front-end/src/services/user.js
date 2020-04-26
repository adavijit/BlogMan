/**
 * This file will contain all the API calls to the server
 * relating to the user.
 */
import http from './http';

const baseURL = `${process.env.REACT_APP_API}/users`;

export const userLogin = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.post(`${baseURL}/login`, body);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const userRegister = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.post(`${baseURL}/register`, body);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};


export const userGoogleSignup = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.post(`${baseURL}/google-signup`, body);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const userGoogleLogin = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.post(`${baseURL}/google-login`, body);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

