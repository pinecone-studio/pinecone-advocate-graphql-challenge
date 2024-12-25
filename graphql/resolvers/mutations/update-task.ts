import { TaskInput } from "@/generated";
import { TaskModel } from "@/mongoose/models/model";

export const updateTask = async (
  _: unknown,
  { input, taskID }: { input: TaskInput; taskID: string }
) => {
  if (!taskID) throw new Error("Task ID is required");

  const { taskName, description, isDone, priority, tags } = input;
  const updatedAt = new Date();

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskID,
      {
        taskName,
        description,
        isDone,
        priority,
        tags,
        updatedAt,
      },
      { new: true }
    );

    if (!updatedTask) throw new Error(`Task with ID: ${taskID} not found`);
    return updatedTask;
  } catch (error) {
    throw new Error("Failed to update task");
  }
};
