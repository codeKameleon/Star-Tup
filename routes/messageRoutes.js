const express =  require('express')

const { verifyToken } = require('../middlewares/authMiddleware')
const { createNewMessage } = require('../controllers/messageController')

const router =  express.Router()

// @description POST a conversation
// @route POST /api/conversations
router.post('/:id', verifyToken, createNewMessage)


module.exports = router