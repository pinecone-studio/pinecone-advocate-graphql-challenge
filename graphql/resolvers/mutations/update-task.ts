import Task from "@/models/task.model";

export const updateTask = async (
  _: unknown,
  {
    taskId,
    taskName,
    priority,
    isDone,
  }: { taskId: string; taskName: string; priority: number; isDone: boolean }
) => {
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { taskName, priority, isDone },
    { new: true }
  );

  if (!updatedTask) {
    throw new Error("Task not found");
  }

  return updatedTask;
};
