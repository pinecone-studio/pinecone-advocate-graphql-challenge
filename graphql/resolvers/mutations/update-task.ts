import mongoose from "mongoose";
import Task from "@/mongoose/models/task";

type UpdateTask = {
  id: string;
  title?: string;
  description?: string;
  isCompleted?: boolean;
  isDeleted?: boolean;
};

export const updateTask = async (_: unknown, values: UpdateTask) => {
  try {
    const id = values.id;
    const updateData = { ...values };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid task ID format: ${id}`);
    }

    const task = await Task.findById(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return updatedTask;
  } catch (error: any) {
    throw new Error(`Failed to update task: ${error.message}`);
  }
};
