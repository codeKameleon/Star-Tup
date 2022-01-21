const express =  require('express')

const { verifyToken } = require('../middlewares/authMiddleware')
const { createNewConversation, getConversations } = require('../controllers/conversationController')

const router =  express.Router()


// @description GET all conversations
// @route GET /api/conversations
router.get('/', verifyToken, getConversations)

// @description POST a conversation
// @route POST /api/conversations
router.post('/', verifyToken, createNewConversation)


module.exports = router