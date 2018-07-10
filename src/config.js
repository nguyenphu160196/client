import axios from 'axios';
import io from 'socket.io-client'
import Peer from 'peerjs';

// const httphost = "http://35.240.162.216:9090";
const httphost = "http://localhost:9090";
// const httphost = "https://kltn0901.herokuapp.com";
// const httphost = "";

export const baseURL = httphost+"/api/v1";
export const filesURL = httphost+"/files/";
export const imagesURL = httphost+"/images/";

export const api = axios.create({
  baseURL: httphost+'/api/v1',
  timeout: 60000
});

let token = localStorage.getItem('authToken');
// export const socket = io({query: {token: token}});
export const socket = io(httphost, {query: {token: token}});
 
const id = localStorage.user ? JSON.parse(localStorage.user)._id : '';
export const peer = new Peer(id, {host: 'localhost', port: 9090 , path: '/api/v1/'});
// export const peer = new Peer(id, {
// 									host: location.hostname, 
// 									port: location.port || (location.protocol === 'https:' ? 443 : 9000), 
// 									path: '/api/v1/'
// 								});