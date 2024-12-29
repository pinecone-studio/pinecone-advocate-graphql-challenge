import { TTodoUpdateInput } from "@/lib/types";
import { TodoModel } from "@/mongoose/model/todo";

export const todoUpdate = async (
  _: unknown,
  { todo, id }: { todo: TTodoUpdateInput; id: String }
) => {
  const updatedTask = TodoModel.findByIdAndUpdate(id, todo, { new: true });
  return updatedTask;
};
