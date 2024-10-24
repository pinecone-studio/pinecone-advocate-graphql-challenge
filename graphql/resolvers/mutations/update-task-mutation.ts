import { taskModel } from "@/graphql/models/task.schema";

export const updateTask = async (
  _: unknown,
  {
    _id,
    taskName,
    isDone,
    priority,
  }: { _id: string; taskName: string; isDone: boolean; priority: number }
) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      _id,
      {
        taskName,
        isDone,
        priority,
      },
      { new: true }
    );
    return updatedTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};
