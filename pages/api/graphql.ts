import { buildSubgraphSchema } from "@apollo/subgraph";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper";
import { ApolloServer } from "apollo-server-cloud-functions";
import { connectMongoose } from "@/mongoose/mongoose-connection";

import { typeDefs } from "@/graphql/schemas";
import { resolvers } from "@/graphql/resolvers";

let connected = false;

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers: resolvers as unknown as GraphQLResolverMap<unknown>,
  }),
  introspection: true,
  csrfPrevention: true,
  cache: new InMemoryLRUCache(),
  context: ({ req, res }: { req: Request; res: Response }) => ({
    headers: req.headers,
    req,
    res,
  }),
});

export const config = { api: { bodyParser: false, externalResolver: true } };


export default async function handler(req: any, res: any, next: any) {
  if (!connected) {
    console.log("🔌 Connecting to MongoDB...");
    await connectMongoose();
    connected = true;
    console.log("✅ MongoDB connected!");
  }

  return server.createHandler()(req, res, next);
}