const mongoose = require ('mongoose')
const ConversationModel = require('../models/conversationModel')

const getConversations = async(req, res) => {
    try {
        const conversations = await ConversationModel.find({ members: {$all: [req.user._id]}})
        .populate('members', 'firstname') 
        
        res.status(200).send(conversations)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

const getConversationById = async(req, res) => {
    try {
        // Check if the id param passed in query is a valid ObjectId
        const ObjectID = mongoose.Types.ObjectId
        if(!ObjectID.isValid(req.params.id)) return res.status(400).send({ message: "Conversation id is not valid" })

        const conversation = await ConversationModel.findOne({ members: { $all: [req.user._id] }, _id: req.params.id })
        .populate('members', 'firstname')
        
        res.status(200).send(conversation)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

const createNewConversation = async(req, res) => {
    try {
    // Check if the body request is a valid ObjectId
    const ObjectID = mongoose.Types.ObjectId
    if(!ObjectID.isValid(req.body[0])) return res.status(400).send({ message: "User id is not valid" })

    // Check if the conversation already exists
    const conversation = await ConversationModel.findOne({
        members: { $all: [req.user._id, req.body] } 
    })
    if (conversation) return res.status(400).send({ message: "Conversation already exists" })

    // Create new conversation
        const newConversation = new ConversationModel({
            members: [req.user._id, req.body]
        })

        const savedConversation = await newConversation.save()

        res.status(200).send(savedConversation)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

module.exports = { 
    getConversations,
    getConversationById,
    createNewConversation
}