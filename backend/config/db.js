import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();
const connectDB = async ()=> {
    try {
        const url = process.env.MONGO_URI
        const conn = await mongoose.connect(url)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB