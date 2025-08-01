import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {
      dbName: "todo",
    });
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("Mongoose connection error:", error);
    console.log("Connection failed");
  }
};
