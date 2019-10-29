//Schema for user schema table


const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true
    }
})

let Users = mongoose.model('Users', userSchema);


exports.Users = Users;