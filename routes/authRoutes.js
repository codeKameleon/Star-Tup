const express =  require('express')

const { createNewUser } = require('../controllers/authController')

const router =  express.Router()


// @description ADD a new user
// @route POST /api/account/register
router.post('/register', createNewUser)


module.exports = router