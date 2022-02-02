import axios from 'axios';

class ClientError extends Error {
  data: any;
}

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
      return axios.get(url, { params, ...options }).catch(e => {
        const err = new ClientError();
        
        err.message = e.response.data.message;
        err.data = e.response.data;

        throw err;
      })
    },
    patch(url: string, body?: any, options = {}) {
      return axios.patch(url, body, options).catch(e => {
        const err = new ClientError();
        
        err.message = e.response.data.message;
        err.data = e.response.data;

        throw err;
      })
    },
    post(url: string, body?: any, options = {}) {
      return axios.post(url, body, options).catch(e => {
        const err = new ClientError();
        
        err.message = e.response.data.message;
        err.data = e.response.data;

        throw err;
      })
    },
    put(url: string, body?: any, options = {}) {
      return axios.put(url, body, options).catch(e => {
        const err = new ClientError();
        
        err.message = e.response.data.message;
        err.data = e.response.data;

        throw err;
      })
    },
    delete(url: string, body?: any, options = {}) {
      return axios.delete(url, { data: body, ...options }).catch(e => {
        const err = new ClientError();
        
        err.message = e.response.data.message;
        err.data = e.response.data;

        throw err;
      })
    }
  }
})()

export default client;