import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    helloQuery: String
    getAllTasks: [Task!]!
    getDoneTasksLists: [Task!]!
  }

  type Task {
    _id: ID!
    taskName: String!
    isDone: Boolean!
    priority: Int!
    createdAt: String!
    updatedAt: String!
  }

  input TaskInput {
    taskName: String!
    isDone: Boolean
    priority: Int!
  }

  input UpdateTaskInput {
    taskName: String
    isDone: Boolean
    priority: Int
  }

  type Mutation {
    sayHello(name: String!): String
    addTask(task: TaskInput!): Task!
    updateTask(taskId: ID!, task: UpdateTaskInput!): Task!
  }
`;
