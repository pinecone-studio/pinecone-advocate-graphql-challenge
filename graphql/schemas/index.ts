import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    _id: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String]
    createdAt: String
    updatedAt: String
  }

  input TaskInput {
    taskName: String!
    description: String!
    isDone: Boolean
    priority: Int!
    tags: [String]
  }

  input UpdateTaskInput {
    taskName: String
    description: String
    priority: Int
    isDone: Boolean
    tags: [String]
  }

  type Query {
    getDoneTasksLists: [Task]
    searchTasks(
      searchTerm: String
      priority: Int
      isDone: Boolean
      createdBefore: String
      createdAfter: String
    ): [Task]
    getAllTasks: [Task]
    helloQuery: String
  }

  type Mutation {
    sayHello(name: String!): String
    addTask(input: TaskInput!): Task
    updateTask(taskId: ID!, input: UpdateTaskInput!): Task
  }
`;
