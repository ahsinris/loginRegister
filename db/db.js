import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectToDatabase = async () => {
    try {
        const uri = process.env.URI + process.env.DATABASE
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        })
        console.log('connected to mongodb atlas')

    }
    catch (error) {
        console.log('error in connecting to mongodb atlas' + error)
        throw error
    }
}

export default connectToDatabase