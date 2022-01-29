const mongoose = require ('mongoose')
const MessageModel = require('../models/messageModel')
const ConversationModel = require('../models/conversationModel')

const getMessages  = async(req, res) => {
    try {
        // Check if the id param passed in query is a valid ObjectId
        const ObjectID = mongoose.Types.ObjectId

        if(!ObjectID.isValid(req.params.conversationId)) {
            return res.status(400).send({ message: "Conversation id is not valid" })
        }

        // Check if the user is allowed to access messages from a conversation
        const conversation = await ConversationModel.findOne(
            { members:  { $all: [req.user._id]}, _id: req.params.conversationId  },
        )

        if (!conversation) {
            return res.status(400).send({ message: "You are not allowed to send a message to this conversation" })
        }

        const messages = await MessageModel.find({
            conversationId: req.params.conversationId
        })

        res.status(200).send(messages)

    } catch(error) {
        res.status(400).send({ message: "Conversation does not exist" })
    }
}

const createNewMessage = async(req, res) => {
    try {
        // Check if the id param passed in query is a valid ObjectId
        const ObjectID = mongoose.Types.ObjectId

        if(!ObjectID.isValid(req.params.conversationId)) {
            return res.status(400).send({ message: "Conversation id is not valid" })
        } 

        // Check if the user is allowed to send a message to a conversation
        const conversation = await ConversationModel.findOne(
            { members:  { $all: [req.user._id]}, _id: req.params.conversationId  },
        )

        if (!conversation) {
            return res.status(400).send({ message: "You are not allowed to send a message to this conversation" })
        }

        const newMessage = new MessageModel({
            conversationId: req.params.conversationId,
            sender: req.user._id,
            content: req.body.content
        })

        const savedMessage = await newMessage.save()

        res.status(200).send(savedMessage)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

const deleteMessage = async(req, res) => {
    try {
        // Check if the id param passed in query is a valid ObjectId
        const ObjectID = mongoose.Types.ObjectId

        if(!ObjectID.isValid(req.params.id)) {
            return res.status(400).send({ message: "Message id is not valid" })
        } 

        const message =  await MessageModel.findById(req.params.id)

        // Check if the message to delete has been sent by the authenticated user
        if(message.sender != req.user._id) {
            return res.status(400).send({ message: "You are not allowed to delete this message" })
        } 

        const deleteMessage = await MessageModel.findByIdAndDelete(req.params.id)
        res.status(200).send(deleteMessage)

    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

module.exports = { 
    createNewMessage,
    getMessages,
    deleteMessage
}