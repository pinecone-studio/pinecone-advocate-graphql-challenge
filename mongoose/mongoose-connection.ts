import mongoose from "mongoose";

export const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("✅ MongoDb connection successful");
  } catch (err) {
    console.log("⚙️ MongoDb connection err ❗️", err);
  }
};
