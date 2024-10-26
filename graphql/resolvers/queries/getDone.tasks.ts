import { Task } from "@/graphql/models";

export const getDoneTasks = async () => {
  try {
    const tasks = await Task.find({ isDone: true }); // Fetch all active tasks
    return tasks;
  } catch (error) {
    throw new Error(`Failed to fetch tasks:`); // Include the error message for debugging
  }
};
