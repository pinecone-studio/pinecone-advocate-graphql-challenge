import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    _id: String!
    taskName: String!
    isDone: Boolean
    priority: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    helloQuery: String
    getAllTasks: [Task]
    getDoneTasksLists: [Task]
  }

  type Mutation {
    sayHello(name: String!): String
    addTask(taskName: String!, priority: Int!, isDone: Boolean): Task
    updateTask(
      _id: String!
      taskName: String!
      priority: Int!
      isDone: Boolean
    ): Task
  }
`;
