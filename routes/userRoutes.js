const express =  require('express')

const { verifyToken } = require('../middlewares/authMiddleware')
const { getAllUsers, getUserById } = require('../controllers/userController')

const router =  express.Router()


// @description GET all users
// @route GET /api/users
router.get('/', verifyToken, getAllUsers)

// @description GET one users
// @route GET /api/users/:id
router.get('/:id', verifyToken, getUserById)


module.exports = router