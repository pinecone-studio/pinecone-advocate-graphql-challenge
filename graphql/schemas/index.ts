import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    _id: ID!
    taskName: String!
    isDone: Boolean!
    priority: Int!
    created_at: String!
    updated_at: String!
  }
  type Query {
    getAllTasks: [Task]
    getDoneTasksLists: [Task]
  }

  type Mutation {
    addTask(taskName: String!, priority: Int!): Task
    updateTask(
      _id: String!
      taskName: String!
      priority: Int!
      isDone: Boolean!
    ): Task
  }
`;
