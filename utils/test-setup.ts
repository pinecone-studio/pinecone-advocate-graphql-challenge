
import mongoose from "mongoose";
import { typeDefs } from "@/graphql/schemas";
import { resolvers } from "@/graphql/resolvers";
import { ApolloServer } from "apollo-server-cloud-functions";

let mongoServer: MongoMemoryServer;

export async function setupTestDB() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
}

export async function teardownTestDB() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) await mongoServer.stop();
}

export function createTestServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
}

export function createTestClient(server: ApolloServer) {
  return {
    mutate: async (operation: { mutation: string; variables?: any }) => {
      const response = await server.executeOperation({
        query: operation.mutation,
        variables: operation.variables,
      });
      if (response.body.kind === "single") return response.body.singleResult;
      throw new Error("Unexpected response format");
    },
    query: async (operation: { query: string; variables?: any }) => {
      const response = await server.executeOperation({
        query: operation.query,
        variables: operation.variables,
      });
      if (response.body.kind === "single") return response.body.singleResult;
      throw new Error("Unexpected response format");
    },
  };
}
