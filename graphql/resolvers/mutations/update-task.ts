import { TaskModel } from "@/mongoose/models/Task";

export const updateTask = async (
  _: unknown,
  {
    taskId,
    taskName,
    description,
    isDone,
    priority,
    tags,
  }: {
    taskId: string;
    taskName?: string;
    description?: string;
    isDone?: boolean;
    priority?: number;
    tags?: string[];
  }
) => {
  const updateData: any = {};

  try {
    if (taskName) updateData.taskName = taskName;
    if (description) {
      if (description.length < 10) {
        throw new Error("Description must be at least 10 characters long");
      }
      updateData.description = description;
    }
    if (priority !== undefined) {
      if (priority < 1 || priority > 5) {
        throw new Error("Priority must be between 1 and 5");
      }
      updateData.priority = priority;
    }
    if (isDone !== undefined) updateData.isDone = isDone;
    if (tags) updateData.tags = tags;

    updateData.updatedAt = new Date();

    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Task not found" ||
        error.message.includes("Description must be") ||
        error.message.includes("Priority must be")
      ) {
        throw error;
      }
      throw new Error(`Failed to update task: ${error.message}`);
    }
    throw new Error("An unknown error occurred during task update");
  }
};
