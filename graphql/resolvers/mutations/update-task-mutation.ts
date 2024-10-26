import { taskModel } from "@/graphql/models/task.schema";

export const updateTask = async (
  _: unknown,
  {
    taskId,
    priority,
    isDone,
    taskName,
  }: {
    taskId: string;
    priority?: number;
    isDone?: boolean;
    taskName?: string;
  }
) => {
  const updateFields: {
    taskName?: string;
    isDone?: boolean;
    priority?: number;
    updatedAt?: Date;
  } = {};

  if (taskName !== undefined) {
    updateFields.taskName = taskName;
  }
  if (isDone !== undefined) {
    updateFields.isDone = isDone;
  }
  if (priority !== undefined) {
    updateFields.priority = priority;
  }

  // Check if there are fields to update
  if (Object.keys(updateFields).length === 0) {
    throw new Error("No fields to update");
  }

  // Always set updatedAt
  updateFields.updatedAt = new Date();

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      updateFields,
      {
        new: true,
      }
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Preserve the original error message
      throw new Error("Failed to update task: " + error.message);
    } else {
      throw new Error("Failed to update task");
    }
  }
};
