import io from 'socket.io-client';

const apiOrigin = process.env.REACT_APP_API_ORIGIN;
const socket = io(apiOrigin, {
  transports: ['websocket'],
  secure: true,
  'force new connection': false,
  reconnect: true,
});

export default socket;
