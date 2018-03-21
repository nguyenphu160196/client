import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://server-cut-air.herokuapp.com/api/',
  timeout: 60000
});

export default api;