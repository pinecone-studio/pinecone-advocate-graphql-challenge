import { TaskModel } from "@/graphql/models/taskSchema";

export const getUserDoneTasksLists = async () => {
  try {
    const doneTasks = await TaskModel.find({ isDone: true });
    return doneTasks;
  } catch (error) {
    console.error("Failed to get done tasks:", error);
    throw new Error("Failed to get done tasks");
  }
};
