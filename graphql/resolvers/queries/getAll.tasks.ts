import { Task } from "@/graphql/models";

export const getAllTasks = async () => {
  try {
    const tasks = await Task.find({}); // Fetch all active tasks
    return tasks;
  } catch (error) {
    throw new Error(`Unable to fetch tasks`); // Include the error message for debugging
  }
};
