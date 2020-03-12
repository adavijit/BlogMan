const createError = require('http-errors');
const Filter = require('bad-words');
const createController = require('../createController');
const Chat = require('../../models/Chat');
const Message = require('../../models/Message');
const { emitMessage } = require('../socket');

const filter = new Filter();

module.exports = {
  get: createController(async (req, res) => {
    const chats = await Chat.find({
      $or: [{ creator: req.user.id }, { participant: req.user.id }],
    })
      .sort({ createdAt: -1 })
      .populate('creator', '_id name')
      .populate('participant', '_id name');
    const newChats = [];
    for (const chat of chats) {
      const newChat = {
        _id: chat.id,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
      };
      if (chat.creator.id === req.user.id) {
        newChat.user = chat.participant._doc;
      } else {
        newChat.user = chat.creator._doc;
      }
      newChats.push(newChat);
    }
    res.json({ chats: newChats });
  }),

  getMessages: createController(async (req, res) => {
    const { id } = req.params;
    const messages = await Message.find({ chatId: id }).sort({ createdAt: 1 });
    res.json({ messages });
  }),

  addMessage: createController(
    async (req, res) => {
      const { message } = res.locals.inputBody;
      const { id: chatId } = req.params;
      const chat = await Chat.findById(chatId);
      if (!chat) {
        throw new createError(404, 'No chat found.', {
          errors: { chatId: 'No chat found.' },
        });
      }
      if (typeof message !== 'string') {
        throw new createError(404, 'Invalid message.', {
          errors: { message: 'Invalid message.' },
        });
      }
      const sanitizedMessage = filter.clean((message + '').trim());
      if (!sanitizedMessage && !req.file) {
        throw new createError(404, 'Validation error.', {
          errors: { message: 'Message should not be empty.' },
        });
      }

      const messageBody = {
        chatId,
        user: req.user.id,
        text: sanitizedMessage,
      };
      if (req.file) messageBody.image = `/images/${req.file.filename}`;
      const messageObj = await Message.create(messageBody);
      res.json({ message: messageObj });
      emitMessage(chatId, messageObj);
    },
    {
      inputs: ['message'],
    },
  ),
};
