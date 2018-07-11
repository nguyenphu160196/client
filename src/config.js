import axios from 'axios';
import io from 'socket.io-client'
import SimpleWebRTC from 'simplewebrtc';

const httphost = "http://localhost:9090";
// const httphost = "https://kltn0901.herokuapp.com";


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

export let webrtc = new SimpleWebRTC({
                    url: "http://localhost:8888",
                    localVideoEl: 'localStream',
                    remoteVideosEl: ''
                });