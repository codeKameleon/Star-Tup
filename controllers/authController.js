const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/userModel')

const { registerValidation } =  require('../middlewares/validationMiddleware')


const createNewUser = async(req, res) => {
    // Validation
    const { error } = registerValidation(req.body)

    if(error) {
        return res.status(400).send({ error: error.details[0].message })
    } 
    
    // Check if user already exists
    const registeringUser =  await UserModel.findOne({ email: req.body.email })

    if(registeringUser) {
        return res.status(400).send(({ message: "This email is already taken" }))
    }

    // Crypt password
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate,
        motto: req.body.motto,
        email: req.body.email,
        password: hashPassword
    })

    try {
        const newUser = await user.save()
        res.status(200).send(newUser)

    } catch(error) {
        res.status(400).send(error)
    }
}

const logUser = async(req, res) => {
    try {
   // Check if email exists
   const user =  await UserModel.findOne({ email: req.body.email })

   if(!user) {
       return res.status(400).send({ message: "Email or password is wrong" })
   }

   // Check if password is correct
   const validPassword = await bcrypt.compare(req.body.password, user.password)

   if(!validPassword) {
       return res.status(400).send({ message: "Email or password is wrong" })
   }

    // Create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "24h" })
    const maxAge = 24 * 60 * 60 * 1000

    // Create cookie
    const DB_HOST = process.env.DB_HOST
    let cookieOptions = {
        httpOnly: true,
        maxAge: maxAge
    }

    if(DB_HOST !== "localhost") {
        cookieOptions = {...cookieOptions, sameSite: 'none', secure: 'true'}
    }

    res.cookie('jwt', token, cookieOptions)

    res.header('auth-token').send({ token: token, user_id: user._id })

    } catch(error) {
        return res.status(400).send({message: "Bad request"})
    }
}

const logOutUser =  async(req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })

    res.send({ message: "Session expired" })
}

module.exports = {
    createNewUser,
    logUser,
    logOutUser
}