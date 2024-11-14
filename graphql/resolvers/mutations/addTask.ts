import Task from "@/models/task.model";

export const addTask = async (
  _: unknown,
  { taskName, priority }: { taskName: string; priority: number }
) => {
  try {
    const task = await Task.create({ taskName, priority });
    return task;
  } catch (error) {
    console.log("aldaa add", error);
  }
};
