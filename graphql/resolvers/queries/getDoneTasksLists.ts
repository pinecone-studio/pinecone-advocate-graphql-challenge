import { taskModel } from "@/graphql/models/task.schema";

export const getDoneTasksLists = async () => {
  try {
    const doneTasks = await taskModel.find({ isDone: true });
    return doneTasks;
  } catch (error) {
    throw new Error("Failed to retrieve done tasks");
  }
};
