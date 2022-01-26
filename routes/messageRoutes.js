const express =  require('express')

const { verifyToken } = require('../middlewares/authMiddleware')
const { createNewMessage, deleteMessage } = require('../controllers/messageController')

const router =  express.Router()

// @description POST a message
// @route POST /api/messages/:conversation_id
router.post('/:id', verifyToken, createNewMessage)

// @description DELETE a message
// @route DELETE /api/messages/:conv_id/:msg_id
router.delete('/:conv_id/:msg_id', verifyToken, deleteMessage)

module.exports = router