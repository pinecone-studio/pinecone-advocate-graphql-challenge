import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getDoneTasks: [Task!]
    getAllTasks: [Task!]
    helloQuery: String
    hiQuery: String
  }

  type Task {
    _id: ID!
    taskName: String!
    isDone: Boolean!
    priority: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    sayHello(name: String!): String
    AddTask(taskName: String!, priority: Int!): Task
    updateTask(id: ID!, taskName: String, isDone: Boolean, priority: Int): Task
  }
`;
