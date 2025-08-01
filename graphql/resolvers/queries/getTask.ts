import { TaskModel } from "@/graphql/models/taskSchema";

export const getTask = async (_: any, { id }: { id: string }) => {
  const task = await TaskModel.findById(id);
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};
