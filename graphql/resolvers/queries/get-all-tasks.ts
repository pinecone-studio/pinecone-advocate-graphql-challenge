import { TaskModel } from "../../../mongoose/task.model";

export const getAllTasks = async (_: unknown, { userId }: { userId: string }) => {
  try {
    if (!userId) throw new Error("User not found");
    return await TaskModel.find({ userId });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch tasks");
  }
};
