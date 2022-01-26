const mongoose = require('mongoose')
const ObjectID = require("mongoose").Types.ObjectId

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: ObjectID
    },
    sender: {
        type: String
    },
    content : {
        type: String,
        required: true
    }
}, { timestamps: true }) 

const MessageModel = mongoose.model('messages', messageSchema)

module.exports = MessageModel