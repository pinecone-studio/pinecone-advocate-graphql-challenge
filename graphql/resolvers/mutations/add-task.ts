import { TaskModel } from "@/graphql/models/task-schema";

export const addTask = async (
  _: unknown,
  {
    taskName,
    description,
    priority,
    userId,
    tags,
  }: {
    taskName: string;
    description: string;
    priority: number;
    userId: string;
    tags?: string[];
  }
) => {
  try {
    if (description === taskName) {
      throw new Error("Description cannot be the same as task name");
    }

    if (description.length < 10) {
      throw new Error("Description must be at least 10 characters long");
    }

    if (priority < 1 || priority > 5) {
      throw new Error("Priority must be between 1 and 5");
    }

    if (tags && tags.length > 5) {
      throw new Error("Tags array cannot have more than 5 elements");
    }

    const newTask = await TaskModel.create({
      taskName,
      description,
      priority,
      userId,
      tags: tags || [],
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return newTask;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("Task name must be unique for this user");
    }

    if (error.name === "ValidationError") {
      throw new Error(`Validation error: ${error.message}`);
    }

    throw new Error(`Failed to add task: ${error.message}`);
  }
};
