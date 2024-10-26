import { taskModel } from "@/graphql/models/task.schema";

export const getDoneTasksLists = async () => {
  try {
    const doneTasksLists = await taskModel.find({ isDone: true });
    return doneTasksLists;
  } catch (error) {
    throw new Error("Database error");
  }
};
