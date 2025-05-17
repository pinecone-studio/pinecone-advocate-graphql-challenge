import Task from "@/mongoose/models/task";
export const getAllTasks = async () => {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error: any) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
};
