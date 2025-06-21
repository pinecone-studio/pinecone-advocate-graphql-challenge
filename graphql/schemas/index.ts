import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
  }

  type Query {
    getAllTasks: [Task!]!
    getFinishedTasksLists: [Task!]!
  }

  type Mutation {
    addTask(title: String!, description: String, completed: Boolean): Task!

    updateTask(
      id: ID!
      title: String
      description: String
      completed: Boolean
    ): Task!
  }
`;
