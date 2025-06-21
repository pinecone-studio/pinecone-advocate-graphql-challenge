import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "../graphql/schemas";
import { resolvers } from "../graphql/resolvers";
import TaskModel from "@/graphql/schemas/Task";

let server: ApolloServer;

export const getTestServer = () => {
  if (!server) {
    server = new ApolloServer({ typeDefs, resolvers });
  }
  return server;
};

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL as string);
};

export const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

export const clearDB = async () => {
  if (mongoose.connection.readyState === 1) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
};

// Test data utilities
export const seedTestData = async () => {
  await TaskModel.create([
    {
      _id: new mongoose.Types.ObjectId("6856b50fd59c7de6309f30d4"),
      title: "Test Task",
      description: "Test Description",
      completed: false,
    },
    {
      title: "Completed Task",
      description: "Done",
      completed: true,
    },
  ]);
};

export const testSetup = async () => {
  await connectDB();
  await seedTestData();
};

export const testTeardown = async () => {
  await clearDB();
  await disconnectDB();
};
