import Peer from 'peerjs'; 
const id = localStorage.user ? JSON.parse(localStorage.user)._id : '';
const peer = new Peer(id, {host: 'localhost', port: 9090, path: '/api/v1/'});
export default peer;