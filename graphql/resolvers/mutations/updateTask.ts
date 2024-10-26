import { taskModel } from "../../../graphql/models/task.schema";

export const updateTask = async (
  _: unknown,
  {
    _id,
    taskName,
    priority,
    isDone,
  }: { _id: string; taskName: string; priority: number; isDone?: boolean }
) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      _id,
      {
        taskName,
        priority,
        isDone: isDone !== undefined ? isDone : false,
      },
      {
        new: true,
      }
    );
    if (!updatedTask) {
      throw new Error("Failed to update task");
    }
    return updatedTask;
  } catch (error) {
    throw new Error("Failed to update task");
  }
};
