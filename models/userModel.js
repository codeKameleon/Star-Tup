const mongoose = require('mongoose')
const { isEmail } = require('validator')

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
        require: true
    },
    motto : {
        type: String
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}) 

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel