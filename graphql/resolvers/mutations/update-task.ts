import { Task } from "@/models/Task";

export const updateTask = async (
  _: unknown,
  {
    taskId,
    task,
  }: {
    taskId: string;
    task: { taskName?: string; isDone?: boolean; priority?: number };
  }
) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        ...task,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      throw new Error("Task not found");
    }
    return updatedTask;
  } catch (err) {
    throw new Error("Unable to update task");
  }
};
