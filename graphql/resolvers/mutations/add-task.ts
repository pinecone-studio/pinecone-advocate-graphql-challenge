import { Task } from "@/models/Task";

export const addTask = async (
  _: unknown,
  { task }: { task: { taskName: string; isDone?: boolean; priority: number } }
) => {
  try {
    const { taskName, isDone = false, priority } = task;
    const newTask = new Task({
      taskName,
      isDone,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newTask.save();
    return newTask;
  } catch (error) {
    throw new Error("Unable to create task");
  }
};
