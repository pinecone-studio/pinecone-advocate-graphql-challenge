import { TaskModel } from "../../../mongoose/task.model";

export const addTaskInput = async (_: unknown, { input }: { input: any }) => {
  try {
    if (!input) throw new Error("User ID is required");

    const { userId, taskName, description, priority, tags, isDone } = input;

    const existingTask = await TaskModel.findOne({ taskName, userId });
    if (existingTask) throw new Error("Task name must be unique");

    const task = new TaskModel({ userId, taskName, description, isDone: isDone || false, priority, tags: tags });
    return await task.save();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to create task");
  }
};
