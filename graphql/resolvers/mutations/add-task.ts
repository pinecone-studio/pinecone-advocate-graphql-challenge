import Task from "@/models/task.model";

export const addTask = async (
  _: unknown,
  {
    taskName,
    priority,
  }: {
    taskName: string;
    priority: number;
  }
) => {
  try {
    const newTask = await Task.create({
      taskName,
      priority,
    });
    //   await newTask.save();
    return newTask;
  } catch (error) {
    throw new Error("Failed to add task");
  }
};
