import axios from 'axios';

axios.defaults.baseURL = 'https://openapi.vmall.com';
axios.defaults.timeout = 3000;

// 请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export function get(url: string, params?: Record<string, any>) {
  return axios.get(url, {
    params
  })
}

export function post(url: string, params: Record<string, any>) {
  return axios.post(url, params)
}