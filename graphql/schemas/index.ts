import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    helloQuery: String
    getAllTasks(userId: String!): [Task]
    getDoneTasks: [Task]
  }
  type Mutation {
    sayHello(name: String!): String
    addTask(taskName: String!, category: String, userId: String!): Task
    updateTask(
      taskId: ID!
      userId: String!
      taskName: String
      category: String
      taskDone: Boolean
    ): Task
    deleteTask(taskId: ID, taskName: String): Task
  }
  type Task {
    _id: ID!
    taskName: String!
    taskDone: Boolean
    category: String
    createdAt: String
    updatedAt: String
    userId: String!
  }
`;
