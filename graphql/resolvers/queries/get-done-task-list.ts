import { TaskModel } from "@/mongoose/type";

export const getDoneTaskLists = async () => {
  try {
    const tasks = await TaskModel.find({ isDone: true });
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch done tasks");
  }
};
