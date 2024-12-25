import { TTodoInput } from "@/lib/types";
import TodoModel from "@/mongoose/model/todo";

export const todoAdd = async (_: unknown, { todo }: { todo: TTodoInput }) => {
  try {
    const todoInstance = new TodoModel(todo);
    const newCreatedTodo = await todoInstance.save();
    return newCreatedTodo;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
