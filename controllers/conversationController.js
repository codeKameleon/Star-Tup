const ConversationModel = require('../models/conversationModel')

const getConversations = async(req, res) => {
    try {
        const conversations = await ConversationModel.find({senderId: req.user._id })
        .populate('receiverId', 'firstname')
        
        res.status(200).send(conversations)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

const getConversationById = async(req, res) => {
    try {
        const conversation = await ConversationModel.findById(req.params.id)
        .populate('receiverId', 'firstname')
        
        res.status(200).send(conversation)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

const createNewConversation = async(req, res) => {
    try {
        const newConversation = new ConversationModel({
            senderId: req.user._id,
            receiverId: req.body.receiverId
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