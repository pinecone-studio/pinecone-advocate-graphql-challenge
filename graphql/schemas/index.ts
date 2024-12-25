import { gql } from "graphql-tag";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
  priority: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export const Task = mongoose.model("Task", taskSchema);

export const typeDefs = gql`
  scalar Date

  type Task {
    _id: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String]
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getDoneTasksLists: [Task]
    searchTasks(
      searchTerm: String
      priority: Int
      isDone: Boolean
      createdBefore: Date
      createdAfter: Date
    ): [Task]
    getAllTasks: [Task]
  }

  type Mutation {
    addTask(
      taskName: String!
      description: String!
      isDone: Boolean
      priority: Int!
      tags: [String]
      createdAt: Date
      updatedAt: Date
    ): Task
    updateTask(
      taskId: ID!
      taskName: String
      description: String
      priority: Int
      isDone: Boolean
      tags: [String]
    ): Task
  }
`;
