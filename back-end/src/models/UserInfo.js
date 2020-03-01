const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserInfoSchema = new Schema(
    {
    name : {
        type: 'string',
        required: true,
        match : /^[a-zA-Z]+$/
    },
    email: {
        type: 'string',
        match : /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    },
    interests : 'string',
    post_liked : 'string',
    comments : 'string',
    skills : 'string',
    college : 'string',
    search_interests : 'string'
    },
    {timestamps:true}
); 
module.exports = mongoose.model('UserInfo',UserInfoSchema);