const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        unique: true
    },
    sender: {
        type: String
    },
    content : {
        type: String
    }
}) 

const MessageModel = mongoose.model('conversations', messageSchema)

module.exports = MessageModel