const bcrypt = require('bcrypt')

const UserModel = require('../models/userModel')

const createNewUser = async(req, res) => {
    // Check if user already exists
    const registeringUser =  await UserModel.findOne({email: req.body.email})
    if(registeringUser) return res.status(400).send(({message: "This email is already taken"}))

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

module.exports = {
    createNewUser
}