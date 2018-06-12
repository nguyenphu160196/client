import io from 'socket.io-client'

var token = localStorage.getItem('authToken');
// export default io('http://localhost:9090', {query: {token: token}});
export default io('https://kltn14110901.herokuapp.com', {query: {token: token}});