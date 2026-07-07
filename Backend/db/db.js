const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const connectToDB = async () =>
{
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        // console.log("Connected to MongoDB");
    } catch (error) {
        // console.error("Error connecting to MongoDB:", error);
        throw new Error(error)
    }
}

module.exports = connectToDB;