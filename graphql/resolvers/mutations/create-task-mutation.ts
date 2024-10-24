import { taskModel } from "@/graphql/models/task.schema";

export const createTask = async (
  _: unknown,
  {
    taskName,
    isDone,
    priority,
  }: { taskName: string; isDone: boolean; priority: number }
) => {
  try {
    const newTask = await taskModel.create({
      taskName,
      isDone,
      priority,
    });
    return newTask;
    // `This is hello Mutation ${taskName},${isDone},${priority}`;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};
