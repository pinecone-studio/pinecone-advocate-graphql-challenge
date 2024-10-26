import { taskModel } from "@/graphql/models/task.schema";

export const getAllTasks = async () => {
  try {
    const allTasks = await taskModel.find({});
    return allTasks;
  } catch (error) {
    throw new Error("Failed to retrieve tasks");
  }
};
