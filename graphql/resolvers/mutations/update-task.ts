import TaskModel from "@/mongoose/models/task.model";
import { ObjectId } from "mongodb";

export const updateTask = async (
  _: unknown,
  {
    id,
    taskName,
    priority,
    isDone,
  }: { id: string; taskName?: string; priority?: number; isDone?: boolean }
) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid task ID");
    }
    console.log("id", id);
    const updatedFields: Record<string, any> = {};
    if (taskName !== undefined) updatedFields.taskName = taskName;
    if (priority !== undefined) updatedFields.priority = priority;
    if (isDone !== undefined) updatedFields.isDone = isDone;
    updatedFields.updatedAt = new Date();

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );
    console.log("task", updatedTask);
    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};
