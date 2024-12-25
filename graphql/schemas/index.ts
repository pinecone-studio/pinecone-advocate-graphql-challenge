import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type Task {
    _id: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String]
    createdAt: Date
    updatedAt: Date
  }

  input TaskInput {
    taskName: String!
    description: String!
    isDone: Boolean
    priority: Int!
    tags: [String]
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
    getDoneTasksLists: [Task!]!
    getTaskById(id: ID!): Task!
    getAllTasks: [Task!]!
    searchTasks(input: SearchTasksInput!): [Task!]!
  }

  type Mutation {
    sayHello(name: String!): String
    addTask(input: TaskInput!): Task
    updateTask(taskID: ID!, input: TaskInput): Task
    deleteTask(id: ID!): String
  }
`;
