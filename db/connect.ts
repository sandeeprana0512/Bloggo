import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "";

export const connectDB = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(uri).then(() => console.log("connected to DB"))
}