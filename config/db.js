const mongoose = require ('mongoose')
const dotenv = require ('dotenv')

dotenv.config()

const dbURI = process.env.DB_URI

const connectDB = async() => {
    try {
        await mongoose.connect(dbURI, { useNewUrlParser : true})
        console.log("db connected")
    } catch(error) {
        console.log(`${error} //  connection to database failed`)
        process.exit.apply(1)
    }
}

module.exports = connectDB