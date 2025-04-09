const mongoose = require('mongoose')
require('dotenv').config();


module.exports = {
    MongoDBConnection: async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("[MONGO DB] Succesfully connected to Database");
        } catch (error) {
            console.log(error)
        }
    }
}