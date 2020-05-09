const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserActivitySchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ipAddress: {
      type: String,
    },
    visitedRoutes: [String],
    timeSpent: {
      type: Number,
      default: 0,
    },
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    visitCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('UserActivity', UserActivitySchema);
