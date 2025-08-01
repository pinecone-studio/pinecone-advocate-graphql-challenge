import { TaskModel } from "@/graphql/model/task";

export const updateTask = async (
  _: unknown,
  {
    taskId,
    userId,
    taskName,
    category,
    taskDone,
  }: {
    taskId: string;
    userId: string;
    taskName?: string;
    category?: string;
    taskDone?: boolean;
  }
) => {
  try {
    const task = await TaskModel.findOne({ _id: taskId, userId });

    if (!task) {
      throw new Error("Task not found or does not belong to this user.");
    }

    if (taskName) task.taskName = taskName;
    if (category) task.category = category;
    if (typeof taskDone === "boolean") task.taskDone = taskDone;

    task.updatedAt = new Date();

    await task.save();

    return task;
  } catch (error: any) {
    throw new Error("Failed to update task: " + error.message);
  }
};
