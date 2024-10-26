import { taskModel } from "@/graphql/models/task.schema";

export const addTask = async (
  _: unknown,
  {
    taskName,
    priority,
    isDone,
  }: { taskName: string; priority: number; isDone?: boolean }
) => {
  try {
    const newTask = await taskModel.create({
      taskName,
      priority,
      isDone: isDone !== undefined ? isDone : false,
    });
    return newTask;
  } catch (error) {
    throw new Error("Failed to add task");
  }
};
