import TaskModel from "@/mongoose/models/task.model"; // Import the Task model

export const getDoneTasks = async () => {
  try {
    const getTasks = await TaskModel.find({ isDone: true });
    return getTasks;
  } catch (error) {
    console.error("Error fetching done tasks:", error);
    throw new Error("Failed to fetch done tasks");
  }
};
