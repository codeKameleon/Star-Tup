const MessageModel = require('../models/messageModel')

// Serch in conversation model the id
// in this conversation update the messages array with
// the info

const createNewMessage = async(req, res) => {
    try {
        const newMessage = new MessageModel({
            conversationId: req.params.id,
            sender: req.user._id,
            content: req.body.content
        })

        const savedMessage = await newMessage.save()

        res.send(savedMessage)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

module.exports = { 
    createNewMessage 
}