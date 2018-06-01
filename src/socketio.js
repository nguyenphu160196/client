import io from 'socket.io-client'

var token = localStorage.getItem('authToken');
export default io('http://localhost:9090', {query: {token: token}});