import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    _id: ID!
    userId: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String]
    createdAt: String!
    updatedAt: String
  }

  input AddTaskInput {
    userId: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String]
  }

  input UpdateTaskInput {
    userId: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String]
  }

  type Query {
    getFinishedTasksLists(userId: ID!): [Task!]!
    getAllTasks(userId: ID!): [Task!]!
  }

  type Mutation {
    addTaskInput(input: AddTaskInput!): Task!
    updateTaskInput(taskId: ID!, input: UpdateTaskInput!): Task!
  }
`;
