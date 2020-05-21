import axios from 'axios';

import { BASE_URL } from './constants';

const instance = axios.create({
  baseURL: BASE_URL
});

const onSuccess = response => (response && response.data ? response.data : response);

const onError = error => {
  let errorText = 'An error occurred!';
  if (error.response || error.message) {
    errorText = error.message;
  }

  return Promise.reject(errorText);
};

const request = options => instance(options).then(onSuccess).catch(onError);

export const get = route => request({
  method: 'GET',
  url: route
});

export const post = (route, data ={}) => request({
  method: 'POST',
  url: route,
  data
});

export const put = (route, data = {}) => request({
  method: 'PUT',
  url: route,
  data
});

export const del = (route, data = {}) => request({
  method: 'DELETE',
  url: route,
  data
});

export default request;
