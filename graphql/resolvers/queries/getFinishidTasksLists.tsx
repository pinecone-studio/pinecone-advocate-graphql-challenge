import { taskModel } from "@/models/task";

export const getFinishedTasksLists = async () => {
  try {
    const finishedTasks = await taskModel.find({ isDone: true });
    return finishedTasks;
  } catch (error) {
    throw error;
  }
};
