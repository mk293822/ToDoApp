import axios from 'axios';

export default axios.create({
  baseURL: 'http://172.22.163.231:8000/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});
