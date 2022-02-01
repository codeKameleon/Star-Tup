const express =  require('express')

const { verifyToken } = require('../middlewares/authMiddleware')
const { getAllUsers, getUserById, updateUser } = require('../controllers/userController')

const router =  express.Router()


// @description GET all users
// @route GET /api/users
router.get('/', verifyToken, getAllUsers)

// @description GET one users
// @route GET /api/users/:id
router.get('/:id', verifyToken, getUserById)

// @description UPDATE one user infos
// @route PUT /api/users/:id
router.put('/:id', verifyToken, updateUser)


module.exports = router