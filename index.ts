import { ApolloServer } from "apollo-server";
import { connectMongoose } from "./mongoose/mongoose-connection";
import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";
const startServer = async () => {
  await connectMongoose();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

startServer();
