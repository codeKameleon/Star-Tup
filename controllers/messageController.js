const MessageModel = require('../models/messageModel')

const getMessages  = async(req, res) => {
    try {
        const messages = await MessageModel.find({
            conversationId: req.params.conversationId
        })
        res.status(200).send(messages)

    } catch(error) {
        res.status(400).send({message: "This conversation does not exist"})
    }
}

const createNewMessage = async(req, res) => {
    try {
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
        const message =  await MessageModel.findById(req.params.id)

        // Check if the message to delete has been sent by the authenticated user
        if(message.sender != req.user._id) return res.status(400).send({ message: "You are not allowed to delete this message" })

        const deleteMessage = await MessageModel.findByIdAndDelete(req.params.id)
        res.status(200).send(deleteMessage)

    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "You don't have the rights to delete this message" })
    }
}

module.exports = { 
    createNewMessage,
    getMessages,
    deleteMessage
}