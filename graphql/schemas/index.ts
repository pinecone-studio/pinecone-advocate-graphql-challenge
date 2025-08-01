import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    _id: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String]
    createdAt: String
    updatedAt: String
    userId: String!
  }

  input AddTaskInput {
    taskName: String!
    description: String!
    isDone: Boolean
    priority: Int!
    tags: [String]
    userId: String!
  }
  input UpdateTaskInput {
    _id: ID!
    taskName: String
    description: String
    isDone: Boolean
    priority: Int
    userId: String!
    tags: [String]
  }

  type Query {
    helloQuery: String
    getUserDoneTasksLists: [Task]
    getTask(id: ID!): Task
  }

  type Mutation {
    sayHello(name: String!): String
    addTask(input: AddTaskInput!): Task
    updateTask(input: UpdateTaskInput!): Task
  }
`;
