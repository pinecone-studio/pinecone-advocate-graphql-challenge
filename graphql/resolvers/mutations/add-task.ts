import { TaskInput } from "@/generated";
import { TaskModel } from "@/mongoose/models/model";

export const addTask = async (_: unknown, { input }: { input: TaskInput }) => {
  const { taskName, description, isDone, priority, tags } = input;

  if (description.length < 10) {
    throw new Error("Description must be at least 10 characters long");
  }
  if (priority < 1 || priority > 5) {
    throw new Error("Priority must be between 1 and 5");
  }
  // const createdAt = createdAt.Dete.now();
  try {
    const result = await TaskModel.create({
      taskName,
      description,
      isDone,
      priority,
      tags,
    });

    return result;
  } catch (error) {
    throw new Error("Failed to create task");
  }
};
