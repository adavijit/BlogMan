const mongoose = require('mongoose')
const { Schema } = mongoose
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Cannot be empty'],
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
            index: true,
        },
        hash: { type: String, required: true },
        name: String,
        lastname: String,
        birth: Date,
        bio: String,
        email: {
            type: 'string',
            match : /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        },
        interests : String,
        post_liked : String,
        comments : String,
        skills : String,
        college : String,
        search_interests : String
        },
    { timestamps: true }
)

UserSchema.methods.toJSON = function() {
    const { _id, username, name, lastname, birth, createdAt, updatedAt } = this
    return {
        _id,
        username,
        name,
        lastname,
        birth,
        createdAt,
        updatedAt
    }
}

UserSchema.plugin(uniqueValidator, { message: 'is already taken.'})

module.exports = mongoose.model('User', UserSchema)