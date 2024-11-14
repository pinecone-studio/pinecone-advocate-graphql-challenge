import { taskModel } from "@/models/Task";

export const getFinishedTasksLists = async () => {
  try {
    const finishedTasks = await taskModel.find({ isDone: true });
    return finishedTasks;
  } catch (error) {
    throw error;
  }
};
