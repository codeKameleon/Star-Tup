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