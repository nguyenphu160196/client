import axios from 'axios';
import io from 'socket.io-client'
import Peer from 'peerjs';

export const baseURL = "http://localhost:9090/api/v1";
export const filesURL = "http://localhost:9090/files/";
export const imagesURL = "http://localhost:9090/images/";
// export const baseURL = "/api/v1";
// export const filesURL = "/files/";
// export const imagesURL = "/images/";

export const api = axios.create({
  baseURL: 'http://localhost:9090/api/v1',
  // baseURL: '/api/v1',
  timeout: 60000
});

let token = localStorage.getItem('authToken');
export const socket = io('http://localhost:9090', {query: {token: token}});
// export const socket = io({query: {token: token}});
 
const id = localStorage.user ? JSON.parse(localStorage.user)._id : '';
// export const peer = new Peer(id, {host: '192.168.1.2', port: 9090, path: '/api/v1/'});
export const peer = new Peer(id, {host: 'localhost', port: 9090, path: '/api/v1/'});