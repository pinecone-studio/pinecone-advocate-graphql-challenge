import { taskModel } from "@/graphql/models/task.schema";

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
    // console.error("Error creating task:", error);
    throw new Error("Failed to add task");
  }
};
