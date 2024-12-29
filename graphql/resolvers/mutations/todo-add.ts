import { TTodoInput } from "@/lib/types";
import { TodoModel } from "@/mongoose/model/todo";

export const todoAdd = async (_: unknown, { todo }: { todo: TTodoInput }) => {
  const newCreatedTodo = await TodoModel.create(todo);
  return newCreatedTodo;
};
