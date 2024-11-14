import TaskModel from "@/mongoose/models/task.model";

export const getAllTasks = async () => {
  try {
    const tasks = await TaskModel.find();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};
