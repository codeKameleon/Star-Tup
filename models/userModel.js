const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    birthdate : {
        type: Date,
        trim: true,
        required: true
    },
    motto : {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}) 

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel