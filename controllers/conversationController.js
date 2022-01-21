const ConversationModel = require('../models/conversationModel')

const getConversations = async(req, res) => {
    try{
        const conversations = await ConversationModel.findOne({senderId: req.user._id})
        console.log(req.user)
        
        res.send(conversations)
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

        res.send(savedConversation)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

module.exports = { 
    getConversations,
    createNewConversation
}