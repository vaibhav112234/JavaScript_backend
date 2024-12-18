import mongoose from "mongoose";


import dotenv from "dotenv";
dotenv.config();

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to database${mongoose.connection.host}`);
  } catch (error) {
    console.log("Failed to Connect with DB");
  }
};
export default connectDB;
