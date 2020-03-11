const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContentSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  domain: String,
  author: String,
  createdOn: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  link: String,
  uploadedBy: String,
  language: [String]
});

module.exports = mongoose.model("Content", ContentSchema);
