import { taskModel } from "@/graphql/models/task.schema";

export const getAllFinishedTasks = async () => {
  try {
    const allFinishedTasks = await taskModel.find({ isDone: true });
    return allFinishedTasks;
  } catch (error) {
    console.error(error);
  }
};
