const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    senderId: {
        type: String
    },
    receiverId: {
        type: String,
        unique: true
    },
    messages : {
        type: Array
    }
}) 

const ConversationModel = mongoose.model('conversations', conversationSchema)

module.exports = ConversationModel