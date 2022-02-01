const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')

const { updateUserValidation } =  require('../middlewares/validationMiddleware')

const getAllUsers = async(req, res) => {
    try {
        const users = await UserModel.find({})
        .select("-password -lastname -email -__v -birthdate")
        
        res.send({ users: users, authenticated_user: req.user })
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

const getUserById = async(req, res) => {
    try {
        if(req.user._id !== req.params.id) return res.status(400).send({ message : "Access Denied" })
        const user = await UserModel.findById(req.params.id)
        
        res.send(user)
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

const updateUser =  async(req, res) => {
    try {
        if(req.user._id !== req.params.id) return res.status(400).send({ message : "Access Denied" })
        // Validation
        const { error } = updateUserValidation(req.body)

        if(error) {
            return res.status(400).send({ error: error.details[0].message })
        } 

        // Crypt password
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const { motto, email, password } = req.body;
        let filteredBody = {};
      
        if (email) {
          filteredBody["email"] = email;
        }

        if(password) {
            filteredBody["password"] = hashPassword;
        }

        if(motto) {
            filteredBody["motto"] = motto;
        }

        console.log(filteredBody)
          
        const user = await UserModel.findByIdAndUpdate(
            req.user._id,
            filteredBody,
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