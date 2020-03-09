const createController = require('../createController');
const Chat = require('../../models/Chat');
const Message = require('../../models/Message');

module.exports = {
  get: createController(async (req, res) => {
    const chats = await Chat.find({
      $or: [{ creator: req.user.id }, { participant: req.user.id }],
    }).sort({ createdAt: -1 })
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
};
