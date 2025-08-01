import { TaskModel } from "../../../mongoose/task.model";

export const updateTaskInput = async (_: unknown, { taskId, input }: { taskId: string; input: any }) => {
  try {
    const { userId, priority } = input;

    if (priority < 1 || priority > 5) throw new Error("Priority must be between 1 and 5");

    const task = await TaskModel.findById(taskId);
    if (!task) throw new Error("Task not found");
    if (task.userId !== userId) throw new Error("Unauthorized");

    Object.assign(task, input);
    const savedTask = await task.save();
    return savedTask;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to update task");
  }
};
