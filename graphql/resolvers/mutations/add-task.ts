import { TaskInput } from "@/generated";
import { TaskModel } from "@/mongoose/type";

export const addTask = async (_: unknown, { input }: { input: TaskInput }) => {
  try {
    const { taskName, priority } = input;
    const task = await TaskModel.create({ taskName, priority });
    return task;
  } catch (error) { 
    throw new Error("failed to add task");
  }
};
