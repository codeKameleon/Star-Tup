const UserModel = require('../models/userModel')

const getAllUsers = async(req, res) => {
    try{
        const users = await UserModel.find({})
        .select("-password")
        .select("-lastname")
        
        res.send({ users: users, authenticated_user: req.user })
    } catch(error) {
        console.log(error)
        res.status(400).send({ message: "Bad request" })
    }
}

module.exports = { 
    getAllUsers
}