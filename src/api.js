import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:9090/api/v1',
  // baseURL: '/api/v1',
  timeout: 60000
});

export default api;