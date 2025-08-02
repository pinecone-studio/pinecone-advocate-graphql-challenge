import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  type Task {
    _id: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String!]!
    createdAt: Date!
    updatedAt: Date!
    userId: String!
  }

  input CreateTaskInput {
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String!]!
    userId: String!
  }

  input UpdateTaskInput {
    id: ID!
    taskName: String
    description: String
    isDone: Boolean
    priority: Int
    tags: [String!]
    userId: String!
  }

  input getUserDoneTasksLists {
    userId: String!
  }

  type Query {
    getUserDoneTasksLists(input: getUserDoneTasksLists!): [Task!]!
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(input: UpdateTaskInput!): Task!
  }
`;
