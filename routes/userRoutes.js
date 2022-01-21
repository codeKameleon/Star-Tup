const express =  require('express')

const { verifyToken } = require('../middlewares/authMiddleware')
const { getAllUsers } = require('../controllers/userController')

const router =  express.Router()


// @description GET all users
// @route GET /api/users
router.get('/', verifyToken, getAllUsers)


module.exports = router