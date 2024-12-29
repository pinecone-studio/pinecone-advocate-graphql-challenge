import { TodoModel } from "@/mongoose/model/todo";

export const getAllTasks = async () => {
  const tasks = await TodoModel.find();
  return tasks;
};
