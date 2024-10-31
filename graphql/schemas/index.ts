import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    id: ID!
    taskName: String!
    isDone: Boolean!
    priority: Int!
    createdAt: String
    updatedAt: String
  }

  type Query {
    helloQuery: String
    getAllTasks: [Task!]!  # Query to fetch all tasks
    getDoneTasks: [Task!]!  # Query to fetch only done tasks
  }

  type Mutation {
    sayHello(name: String!): String
    addTask(taskName: String!, priority: Int!): Task 
    updateTask(id: ID!, taskName: String, isDone: Boolean, priority: Int): Task
  }
`;
