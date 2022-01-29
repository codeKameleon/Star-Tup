const express =  require('express')

const { verifyToken } = require('../middlewares/authMiddleware')
const { createNewMessage, getMessages, deleteMessage } = require('../controllers/messageController')

const router =  express.Router()

// @description GET all messages from a conversation
// @route GET /api/messages/:conversationId
router.get('/:conversationId', verifyToken, getMessages)

// @description POST a message in a conversation
// @route POST /api/messages/:conversationId
router.post('/:conversationId', verifyToken, createNewMessage)

// @description DELETE a message
// @route DELETE /api/messages/:id
router.delete('/:id/', verifyToken, deleteMessage)

module.exports = router