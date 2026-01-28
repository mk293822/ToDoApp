import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.22.21.141:8000/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // optional: prevent infinite redirect loops
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default api;
