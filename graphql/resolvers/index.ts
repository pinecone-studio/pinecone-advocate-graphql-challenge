import { addTodo, deleteTodo, updateTask } from "./mutations/todo";
import { getTodo } from "./queries/getTodo";

export const resolvers = {
  Query: {
    getTodo,
  },
  Mutation: {
    addTodo,
    deleteTodo,
    updateTask,
  },
};
