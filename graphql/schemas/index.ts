import { gql } from "apollo-server-cloud-functions";

export const typeDefs = gql`
  scalar Date

  type Task {
    _id: ID!
    taskName: String!
    priority: Int!
    isDone: Boolean
    createdAt: Date!
    updatedAt: Date!
  }

  input TaskInput {
    taskName: String!
    priority: Int!
  }

  input UpdateTaskInput {
    _id: ID!
    taskName: String!
    priority: Int!
    isDone: Boolean!
  }

  type Query {
    getAllTasks: [Task!]!
    getDoneTaskLists: [Task!]!
  }

  type Mutation {
    addTask(input: TaskInput): Task!
    updateTask(input: UpdateTaskInput): Task!
  }
`;