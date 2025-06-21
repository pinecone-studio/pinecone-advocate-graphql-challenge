import mongoose from "mongoose";

export const connectMongoose = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Connection successful");
  } catch (error) {
    console.error("Mongoose connection error:", error);
    console.log("Connection failed");
  }
};
