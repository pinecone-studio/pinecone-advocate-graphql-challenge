import { taskModel } from "@/graphql/models/task.schema";

export const updateTask = async (
  _: unknown,
  {
    _id,
    taskName,
    priority,
    isDone,
  }: { _id: string; taskName: string; priority: number; isDone: boolean }
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
    return updatedTask;
  } catch (error) {
    return error;
  }
};
