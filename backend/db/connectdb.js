import mongoose from "mongoose"

const connectDB = async (DATABASE_URL) => {
    try {

        const DB_options = {
            // user : "rishabh",
            // pass : "123456",
            dbName : "upskill",
            // authSource : "upskill"
        }

        await mongoose.connect(DATABASE_URL, DB_options)
        console.log("Connected to MongoDB successfully")

    } catch (err) {
        console.log("Error connecting MongoDB "+ err)
    }
}

export default connectDB