import Task from "@/models/task.model";

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
    const task = await Task.findByIdAndUpdate(_id, {
      taskName,
      priority,
      isDone,
    });
    return task;
  } catch (error) {
    console.log("aldaa add", error);
  }
};
