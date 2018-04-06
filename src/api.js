import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://server-cut-air.herokuapp.com/api/',
  // baseURL: 'http://localhost:9090/api/',
  timeout: 60000
});

export default api;