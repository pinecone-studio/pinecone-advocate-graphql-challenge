import { TaskModel } from "@/mongoose/models/Task";

export const getDoneTasksLists = async () => {
  try {
    const tasks = await TaskModel.find({ isDone: true });
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch finished tasks");
  }
};
