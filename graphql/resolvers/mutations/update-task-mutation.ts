import { taskModel } from "@/graphql/models/task.schema";

export const updateTask = async (
  _: unknown,
  {
    _id,
    task,
  }: {
    _id: string;
    task: { taskName: string; isDone: boolean; priority: number };
  }
) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(_id, task, {
      new: true,
    });
    return updatedTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};
