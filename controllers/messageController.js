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

const deleteMessage = async(req, res) => {
    try {
        const messageToDelete = {
            messages: {
                _id: req.params.msg_id,
            }
        }
    
        const conversationUpdated = await ConversationModel.findOneAndUpdate(
            { members: { $all: [req.user._id] }, _id: req.params.conv_id },
            { $pull: messageToDelete },
            { new: true }
        ).populate('members', 'firstname')
        res.status(200).send(conversationUpdated)

    } catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
}

module.exports = { 
    createNewMessage,
    deleteMessage
}