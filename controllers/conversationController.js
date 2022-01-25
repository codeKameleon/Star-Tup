const ConversationModel = require('../models/conversationModel')

const getConversations = async(req, res) => {
    try{
        const conversations = await ConversationModel.find({senderId: req.user._id})
        
        res.send(conversations)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

const getConversationById = async(req, res) => {
    try {
        const conversation = await ConversationModel.findById(req.params.id)
        
        res.send(conversation)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

const createNewConversation = async(req, res) => {
    try{
        const newConversation = new ConversationModel({
            senderId: req.user._id,
            receiverId: req.body.receiverId
        })

        const savedConversation = await newConversation.save()

        res.send({conversation: savedConversation, sender : req.user._id})
    } catch(error) {
        console.log('failed')
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

module.exports = { 
    getConversations,
    getConversationById,
    createNewConversation
}