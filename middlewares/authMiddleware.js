const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>  {
    const token = req.cookies.jwt

    if(!token) return res.status(401).send({ message: "Access Denied" })

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)

        req.user = verified

        next()
    } catch(error) {
        console.log(error)
        res.cookie('jwt', '', { maxAge: 1})
        res.status(400).send({ message: "Invalid Token" })
    }
}

module.exports = {
    verifyToken
}