const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({
  topic: {
    type: String,
    unique: true,
    required: true
  },
  content: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String
  }],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  source: [{
    type: String
  }]
});


module.exports = mongoose.model("Blog", BlogSchema);
