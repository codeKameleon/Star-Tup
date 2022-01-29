const UserModel = require('../models/userModel')

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
        const user = await UserModel.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    email: req.body.email,
                    password: req.body.password,
                    motto: req.body.motto
                }
            },
            { new : true }
        )

        res.status(200).send(user)
    } catch(error) {
        console.log(error)
        return res.status(400).send("Update user failed: " +  error)
    }
}

module.exports = { 
    getAllUsers,
    getUserById,
    updateUser
}