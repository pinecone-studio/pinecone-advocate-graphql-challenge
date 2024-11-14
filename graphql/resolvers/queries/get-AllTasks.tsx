import { taskModel } from "@/models/task";

export const getAllTasks = async () => {
  try {
    return await taskModel.find();
  } catch (error) {
    throw new Error("Unable to retrieve tasks");
  }
};
