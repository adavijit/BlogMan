const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Chat', ChatSchema);
