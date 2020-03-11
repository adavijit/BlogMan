const jwt = require('../../utils/jwt');
const User = require('../../models/User');
const Chat = require('../../models/Chat');
const Message = require('../../models/Message');

module.exports = {
  authenticate: (socket, data, callback) => {
    if (!data) callback(null, false);
    const authData = jwt.verify(data.token);
    if (!(authData && authData.username)) {
      callback(null, false);
    } else {
      socket.username = authData.username;
      socket.userId = authData.id;
      callback(null, true);
    }
  },

  joinAll: async (socket) => {
    const chats = await Chat.find({
      $or: [{ creator: socket.userId }, { participant: socket.userId }],
    }).select('_id');
    for (const chat of chats) {
      socket.join(chat.id);
    }
  },

  joinNew: (socket) => {
    return async ({ username }, callback) => {
      try {
        if (socket.username === username) {
          callback(null, {
            username:
              'Please enter username of the person you want to chat with.',
          });
          return;
        }

        const user = await User.findOne({ username: socket.username });
        const participant = await User.findOne({ username });
        if (!participant) {
          callback(null, { username: 'No user with this username.' });
          return;
        }
        if (!user) {
          callback(null, { default: "Can't find your account." });
          return;
        }
        const preChat = await Chat.findOne({
          $or: [
            { $and: [{ creator: user.id }, { participant: participant.id }] },
            { $and: [{ creator: participant.id }, { participant: user.id }] },
          ],
        });
        if (preChat) {
          callback(null, { username: 'Chat already exists.' });
          return;
        }
        const chat = await Chat.create({
          creator: user.id,
          participant: participant.id,
        });
        const result = {
          _id: chat.id,
          user: {
            _id: participant.id,
            name: participant.name,
          },
        };
        callback(result);
      } catch (error) {
        console.log(error);
        callback(null, { default: 'Server error.' });
      }
    };
  },

  addMessage: (socket, io) => {
    return async ({ chatId, message }, callback) => {
      try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
          callback(null, { chatId: 'No chat found.' });
          return;
        }
        if (typeof message !== 'string') {
          callback(null, { message: 'Invalid message.' });
          return;
        }
        const sanitizedMessage = (message + '').trim();
        if (!sanitizedMessage) {
          callback(null, { message: 'Message should not be empty.' });
          return;
        }
        const messageObj = await Message.create({
          chatId,
          user: socket.userId,
          text: sanitizedMessage,
        });
        io.to(chatId).emit('message', { chatId, message: messageObj });
        callback(messageObj);
      } catch (error) {
        console.log(error);
        callback(null, { default: 'Server error.' });
      }
    };
  },
};
