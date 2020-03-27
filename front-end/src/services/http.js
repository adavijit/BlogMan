import axios from 'axios';

/**
 * Creating instance of axios
 * This will be useful if we want to add a global interceptor or headers
 */
const http = axios.create();

http.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('token_id');
    if (token) config.headers.common['Authorization'] = `Bearer ${token}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    let extractedErrors = {};
    const errorObj = {};
    let errorMsg = 'Unexpected error occured.';
    if (!(error && error.response)) {
      errorMsg = 'Can not reach the server at the moment.';
    } else if (error.response.data) {
      if (
        error.response.data.errors &&
        Object.keys(error.response.data.errors).length > 0
      ) {
        extractedErrors = error.response.data.errors;
      }
      if (error.response.data.message) {
        errorMsg = error.response.data.message;
      }
    }

    errorObj.data = extractedErrors;
    errorObj.message = errorMsg;
    if (error && error.response && error.response.status) {
      errorObj.status = error.response.status;
    }
    return Promise.reject(errorObj);
  },
);

export default http;
