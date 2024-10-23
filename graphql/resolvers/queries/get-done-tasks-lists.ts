import { Task } from "@/models/Task";

export const getDoneTasksLists = async () => {
  try {
    const doneTasks = await Task.find({ isDone: true });
    return doneTasks;
  } catch (error) {
    throw new Error("Unable to fetch done tasks");
  }
};
