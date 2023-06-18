import axios from 'axios';

axios.defaults.timeout = 3000;

// 请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
  const { status, data } = response
  if (status === 200) {
    return data
  }
  console.log(response)
  if (data.info) {
    console.error(data.info)
  }
  return Promise.reject('request error')
}, function (error) {
  return Promise.reject(error);
});

export function get(url: string, params?: Record<string, any>) {
  return axios.get(url, {
    params: Object.assign({
      lang: 'zh-CN',
      country: 'CN',
      portal: 2
    }, params)
  })
}

export function post(url: string, params: Record<string, any>) {
  return axios.post(url, params)
}