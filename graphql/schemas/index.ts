import { gql } from "graphql-tag";
import mongoose, { model } from "mongoose";
export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }
  type Query {
    getTodo: [Todo!]!
    getFinishedTasksLists: [Todo!]!
  }
  type Mutation {
    addTodo(title: String!): Todo!
    deleteTodo(id: ID!, title: String, completed: Boolean): Todo!
    updateTask(id: ID!, title: String, completed: Boolean): Todo!
  }
`;

const TodoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: false },
  },
  { timestamps: true }
);

export const TodoModel =
  mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
