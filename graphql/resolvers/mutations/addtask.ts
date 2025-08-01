import { TaskModel } from "@/graphql/model/task";

export const addTask = async (
  _: unknown,
  {
    taskName,
    category,
    userId,
  }: { taskName: string; category: string; userId: string }
) => {
  try {
    const newTask = await TaskModel.create({
      taskName,
      category,
      taskDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
    });
    return newTask;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("This task name already exists for the user.");
    }
    throw new Error(`Failed to add task: ${error.message}`);
  }
};
