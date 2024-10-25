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
  type updatedTaskPara {
    taskName: String
    isDone: Boolean
    priority: Int
  }
  type Mutation {
    sayHello(name: String!): String
    addTask(taskName: String!, priority: Int!): Task
    updateTask(_id: ID!,updatedTaskPara): Task
  }
`;
