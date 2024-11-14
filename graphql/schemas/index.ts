import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    _id: ID!
    taskName: String!
    priority: Int!
    isDone: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    helloQuery: String
    getAllTasks: [Task]
    getFinishedTasksLists: [Task]
  }
  type Mutation {
    sayHello(name: String!): String
    addTask(taskName: String!, priority: Int!): Task
    updateTask(_id: ID!, taskName: String, priority: Int, isDone: Boolean): Task
  }
`;
