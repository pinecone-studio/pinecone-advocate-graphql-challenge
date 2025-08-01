import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    helloQuery: String
    getAllTasks: [Task]
    getUserDoneTasksLists(userId: String!): [Task]
  }

  type Mutation {
    sayHello(name: String!): String
    addTask(
      taskName: String!
      description: String!
      priority: Int!
      userId: String!
      tags: [String]
    ): Task
    updateTask(
      taskId: ID!
      userId: String!
      taskName: String
      description: String
      priority: Int
      isDone: Boolean
      tags: [String]
    ): Task
    deleteTask(taskId: ID, taskName: String): Task
  }

  type Task {
    _id: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    userId: String!
    tags: [String]
    createdAt: String!
    updatedAt: String!
  }
`;
