import { TaskModel } from "@/mongoose/TaskModel/Task";

export const getDoneTasksLists = async () => {
  try {
    const result = await TaskModel.find({ isDone: true });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch done tasks");
  }
};
