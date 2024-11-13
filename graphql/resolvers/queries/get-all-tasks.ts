import { TaskModel } from "@/mongoose/type";

export const getAllTasks = async () => {
  try {
    const tasks = await TaskModel.find();
    return tasks;
  } catch (error) {
    throw new Error("failed to get tasks");
  }
};