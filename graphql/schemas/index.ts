import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    isCompleted: Boolean!
    isFinished: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    helloQuery: String
    getAllTasks: [Task!]!
    getFinishedTasksLists: [Task!]!
  }

  type Mutation {
    sayHello(name: String!): String
    addTask(title: String!, description: String): Task!
    updateTask(
      id: ID!
      title: String
      description: String
      isCompleted: Boolean
      isFinished: Boolean
    ): Task!
  }
`;
