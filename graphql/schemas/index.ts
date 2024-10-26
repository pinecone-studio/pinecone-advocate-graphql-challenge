import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    helloQuery: String
    getAllTasks: [Task]
    getDoneTasks: [Task]
  }
  type Mutation {
    sayHello(name: String!): String
    addTask(taskName: String!, priority: Int!): Task
    updateTask(
      taskId: ID!
      taskName: String
      priority: Int
      isDone: Boolean
    ): Task
  }
  type Task {
    _id: ID!
    taskName: String!
    isDone: Boolean
    priority: Int!
    createdAt: String
    updatedAt: String
  }
`;
