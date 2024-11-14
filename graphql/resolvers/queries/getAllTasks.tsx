import { taskModel } from "@/models/Task";

export const getAllTasks = async () => {
  try {
    return await taskModel.find();
  } catch (error) {
    throw new Error("Unable to retrieve tasks");
  }
};
