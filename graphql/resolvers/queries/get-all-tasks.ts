import Task from "@/models/task.model";

export const getAllTasks = async () => {
  try {
    return await Task.find();
  } catch (error) {
    throw new Error("Error fetching active tasks");
  }
};
