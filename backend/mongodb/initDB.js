const mongoose = require('mongoose')
require('dotenv').config();


module.exports = {
    MongoDBConnection: async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("database connect")
        } catch (error) {
            console.log(error)
        }
    }
}