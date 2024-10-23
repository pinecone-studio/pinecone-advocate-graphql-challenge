import { Task } from "@/models/Task";

export const getAllTasks = async () => {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    throw new Error("Unable to fetch tasks");
  }
};
