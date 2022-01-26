const mongoose = require('mongoose')
const ObjectID = require("mongoose").Types.ObjectId

const conversationSchema = new mongoose.Schema({
    members: [{
        type: ObjectID,
        ref: 'users'
    }],
    messages: {
        type: Array
    }
}) 

const ConversationModel = mongoose.model('conversations', conversationSchema)

module.exports = ConversationModel