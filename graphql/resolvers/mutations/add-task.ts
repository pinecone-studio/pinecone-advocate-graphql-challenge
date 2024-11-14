import { taskModel } from "@/models/task";

export const addTask = async (
  _: unknown,
  { taskName, priority }: { taskName: string; priority: number }
) => {
  try {
    const newTask = await taskModel.create({
      taskName,
      priority,
    });
    return newTask;
  } catch (error) {
    throw new Error("Unable to add the task");
  }
};
