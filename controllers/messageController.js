const MessageModel = require('../models/messageModel')

const createNewMessage = async(req, res) => {
    try{
        const newMessage = new MessageModel({
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