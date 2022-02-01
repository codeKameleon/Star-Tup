const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')

const { updateUserValidation } =  require('../middlewares/validationMiddleware')

const getAllUsers = async(req, res) => {
    try {
        const users = await UserModel.find({})
        .select("-password")
        .select("-lastname")
        
        res.send({ users: users, authenticated_user: req.user })
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

const getUserById = async(req, res) => {
    try{
        const user = await UserModel.findById(req.params.id)
        
        res.send(user)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

const updateUser =  async(req, res) => {
    try {

        // Validation
        const { error } = updateUserValidation(req.body)

        if(error) {
            return res.status(400).send({ error: error.details[0].message })
        } 


        // Crypt password
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        
        const user = await UserModel.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    motto: req.body.motto,
                    email: req.body.email,
                    password: hashPassword
                }
            },
            { new : true }
        )

        res.status(200).send(user)
    } catch(error) {
        console.log(error)
        return res.status(400).send({message: "Update user failed: " +  error })
    }
}

module.exports = { 
    getAllUsers,
    getUserById,
    updateUser
}