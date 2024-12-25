import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type Task {
    _id: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String!] # An array of non-null strings
    createdAt: Date # Optional
    updatedAt: Date # Optional
  }

  input TaskInput {
    taskName: String!
    description: String!
    isDone: Boolean = false # Default value for isDone
    priority: Int!
    tags: [String!] # An array of non-null strings
  }

  input SearchTasksInput {
    searchTerm: String
    priority: Int
    isDone: Boolean
    createdBefore: Date
    createdAfter: Date
  }

  type Query {
    helloQuery: String
    getDoneTasksList: [Task!]! # Cleaned up naming
    getAllTasks: [Task!]!
    searchTasks(input: SearchTasksInput!): [Task!]!
  }

  type Mutation {
    sayHello(name: String!): String
    addTask(input: TaskInput!): Task!
    updateTask(taskID: ID!, input: TaskInput!): Task # Fixed taskID syntax and input nullability
  }
`;
