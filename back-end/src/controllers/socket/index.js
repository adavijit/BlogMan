const socketIO = require('socket.io');
const socketAuth = require('socketio-auth');
const controllers = require('./controllers');

let io = null;

const postAuthenticate = async (socket) => {
  try {
    await controllers.joinAll(socket);
    socket.on('join', controllers.joinNew(socket));
    socket.on('message', controllers.addMessage(socket, io));
  } catch (error) {
    console.log(error);
  }
};

const socketInit = (server) => {
  io = socketIO(server);
  socketAuth(io, { authenticate: controllers.authenticate, postAuthenticate });
};

const emitMessage = (chatId, message) => {
  io.to(chatId).emit('message', { chatId, message });
};

module.exports = {
  socketInit,
  emitMessage,
};
