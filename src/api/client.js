import axios from 'axios';

const client = (() => {
  let hasToken = false;

  return {
    defaults: {
      setBaseUrl(url) {
        axios.defaults.baseURL = `${url}/api/v1`;
      },
      setToken(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        hasToken = !!token;
      },
      
      interceptors: axios.interceptors
    },
    hasToken() {
      return hasToken;
    },
    get(url, params, options = {}) {
      return axios.get(url, { params, ...options })
    },
    post(url, body, options = {}) {
      return axios.post(url, body, options)
    },
    put(url, body, options = {}) {
      return axios.put(url, body, options)
    }
  }
})()

export default client;