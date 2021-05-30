import io from 'socket.io-client';

const socket = io('http://localhost:3001',{
    transports: ['websocket'],
    secure: true,
    'force new connection' : false,
    'reconnect' : true,
});

export default socket;
