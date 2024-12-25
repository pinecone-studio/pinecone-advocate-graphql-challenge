import { TaskModel } from "@/mongoose/models/Task";

export const getAllTasks = async () => {
  try {
    const tasks = await TaskModel.find({ isDeleted: false });
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
};
