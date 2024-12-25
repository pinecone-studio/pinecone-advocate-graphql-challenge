import { TaskModel } from "@/mongoose/models/model";

export const getAllTasks = async () => {
  try {
    const tasks = await TaskModel.find();
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
};
