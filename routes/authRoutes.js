const express =  require('express')

const { 
    createNewUser, 
    logUser,
    logOutUser
} = require('../controllers/authController')

const router =  express.Router()


// @description ADD a new user
// @route POST /api/account/register
router.post('/register', createNewUser)

// @description LOG an existing user
// @route GET /api/account/login
router.post('/login', logUser)


module.exports = router