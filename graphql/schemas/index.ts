import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    _id: ID!
    taskName: String!
    priority: Int!
    isDone: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getDoneTasks: [Task!]!
    getAllTasks: [Task!]!
  }

  type Mutation {
    addTask(taskName: String!, priority: Int!): Task
    updateTask(
      taskId: ID!
      taskName: String
      priority: Int
      isDone: Boolean
    ): Task
  }
`;
