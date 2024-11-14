import { taskModel } from "@/models/task.schema";

export const getFinishedTasksLists = async () => {
  try {
    const finishedTasks = await taskModel.find({ isDone: true });
    return finishedTasks;
  } catch (error) {
    throw error;
  }
};
