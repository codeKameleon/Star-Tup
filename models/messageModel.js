const mongoose = require('mongoose')
const ObjectID = require("mongoose").Types.ObjectId

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: ObjectID,
        ref: 'conversations'
    },
    sender: {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    }
}) 

const MessageModel = mongoose.model('messages', messageSchema)

module.exports = MessageModel