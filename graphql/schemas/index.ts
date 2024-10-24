import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    _id: ID!
    taskName: String!
    isDone: Boolean!
    priority: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    helloQuery: String
    getAllTasks: [Task!]!
    getAllFinishedTasks: [Task!]!
  }
  type Mutation {
    sayHello(name: String!): String
    createTask(taskName: String!, isDone: Boolean!, priority: Int!): Task
    updateTask(
      _id: String!
      taskName: String!
      isDone: Boolean!
      priority: Int!
    ): Task
  }
`;
