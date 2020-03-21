const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Cannot be empty'],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
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
    default: null,
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
    required: false, 
  },
  googleId: {
    type: String
  }
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

const hashPassword = function(next) {
  var user = this;
  if (user.hash && (this.isModified('hash') || this.isNew)) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.hash, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.hash = hash;
        next();
      });
    });
  } else {
    return next();
  }
}

const checkPassword = async function(pass) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, this.hash, function(err, isMatch) {
      if (err) {
        reject(err);
      }
      resolve(isMatch);
    });
  });
}
  
UserSchema.plugin(uniqueValidator, { message: 'is already taken.'})

UserSchema.pre('save', hashPassword);

UserSchema.methods.checkPassword = checkPassword;

module.exports = mongoose.model('User', UserSchema)