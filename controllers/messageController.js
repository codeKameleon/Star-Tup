const ConversationModel = require('../models/conversationModel')
const MessageModel = require('../models/messageModel')

const createNewMessage = async(req, res) => {
    try {
        const newMessage = new MessageModel({
            conversationId: req.params.id,
            sender: req.user._id,
            content: req.body.content
        })

        const savedMessage = await newMessage.save()

        const conversation = await ConversationModel.findByIdAndUpdate(
            req.params.id,
            { $push: { messages: savedMessage }},
            { new: true }
        )

        res.status(200).send({ message: savedMessage, conversation: conversation })
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

module.exports = { 
    createNewMessage 
}