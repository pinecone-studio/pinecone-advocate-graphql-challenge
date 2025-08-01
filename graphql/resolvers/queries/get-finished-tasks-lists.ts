import { TaskModel } from "../../../mongoose/task.model";

export const getFinishedTasksLists = async (_: unknown, { userId }: { userId: string }) => {
  try {
    if (!userId) throw new Error("User not found");
    return await TaskModel.find({ userId, isDone: true });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch tasks");
  }
};
