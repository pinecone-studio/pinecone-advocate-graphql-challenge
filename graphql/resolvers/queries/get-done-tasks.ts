import Task from "@/models/task.model";

export const getDoneTasks = async () => {
  try {
    return await Task.find({ isDone: true });
  } catch (error) {
    throw new Error("Error fetching done tasks");
  }
};
