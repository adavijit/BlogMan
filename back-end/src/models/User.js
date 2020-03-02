const mongoose = require('mongoose')
const { Schema } = mongoose
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Cannot be empty'],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: [/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/, 'invalid email'],
  },
  birth: {
    type:Date,
    default: Date.now,
  },
  bio: {
    type: String,
  },
  interests: {
    type: String,
  },
  postsLiked: {
    type: String,
  },
  comments: {
    body: String,
    date: Date,
  },
  skills: {
    type: String,
  },
  college: {
    type: String,
  },
  searchInterests: {
    type: String,
  },
  hash: { 
    type: String, 
    required: true, 
  },
}, {
    timestamps: true,
});

UserSchema.methods.toJSON = function() {
    const { _id, username, name, email, birth, comments, skills, interests, postsLiked, createdAt, updatedAt } = this
    return {
        _id,
        username,
        name,
        email,
        birth,
        comments,
        skills,
        postsLiked,
        interests,
        createdAt,
        updatedAt
    }
}

UserSchema.plugin(uniqueValidator, { message: 'is already taken.'})

module.exports = mongoose.model('User', UserSchema)