import TaskModel from "@/graphql/schemas/Task";
import mongoose from "mongoose";

export const updateTask = async (
  _: any,
  args: {
    id: string;
    title?: string;
    description?: string;
    completed?: boolean;
  }
) => {
  if (!mongoose.Types.ObjectId.isValid(args.id)) {
    throw new Error("Invalid task ID");
  }

  const task = await TaskModel.findById(args.id);
  if (!task) throw new Error("Task not found");

  if (args.title !== undefined) task.title = args.title;
  if (args.description !== undefined) task.description = args.description;
  if (args.completed !== undefined) task.completed = args.completed;

  await task.save();
  return task;
};
