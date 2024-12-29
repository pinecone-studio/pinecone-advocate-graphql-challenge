import { TodoModel } from "@/mongoose/model/todo";

export const getDoneTasks = async () => {
  const tasks = await TodoModel.find({
    isDone: true,
  });
  return tasks;
};
