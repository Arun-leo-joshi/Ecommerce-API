import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url = process.env.DB_URL;

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url, {
            useNewurlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongodb connected using mongoose")
    } catch (err) {
        console.log(err)
    }
}