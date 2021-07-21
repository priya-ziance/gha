import axios from 'axios';

const client = (() => {
  let hasToken = false;

  return {
    defaults: {
      setBaseUrl(url?: string) {
        axios.defaults.baseURL = `${url}/api/v1`;
      },
      setToken(token?: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        hasToken = !!token;
      },

      setLocationHeader(locationId?: string) {
        axios.defaults.headers.common['location'] = locationId;
      },
      
      interceptors: axios.interceptors
    },
    hasToken() {
      return hasToken;
    },
    get(url: string, params?: any, options = {}) {
      return axios.get(url, { params, ...options })
    },
    patch(url: string, body?: any, options = {}) {
      return axios.patch(url, body, options)
    },
    post(url: string, body?: any, options = {}) {
      return axios.post(url, body, options)
    },
    put(url: string, body?: any, options = {}) {
      return axios.put(url, body, options)
    }
  }
})()

export default client;