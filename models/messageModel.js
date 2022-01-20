const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
        unique: true
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

const MessageModel = mongoose.model('conversations', messageSchema)

module.exports = MessageModel