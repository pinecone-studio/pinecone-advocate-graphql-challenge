import { gql } from "graphql-tag";

export const typeDefs = gql`

scalar Date

type Task {
  _id: ID!
  taskName: String!
  isDone: Boolean!
  priority: Int! 
  tags: [String!]
  userId: String!
  createdAt: Date!
  updatedAt: Date!
}

type User {
  _id: ID!
  name: String!
  createdAt: Date!
  updatedAt: Date!
}

type TaskResponse {
  success: Boolean!
  data: Task 
  message: String!
}

type UserResponse {
  success: Boolean!
  message: String!
  data: User 
}

type Query {
  getAllTasks: [Task!]!
  getFinishedTasks(userId: String!): [Task!]!
}

type Mutation {
  addTask( 
    taskName: String!
    description: String!
    priority: Int!
    tags: [String!]
    userId: String!
  ): TaskResponse

  updateTask(
    id: ID!
    taskName: String
    description: String
    isDone: Boolean
    priority: Int
    tags: [String!]
        userId: String!  
  ): TaskResponse

  addUser(name: String!): UserResponse!
}
`;