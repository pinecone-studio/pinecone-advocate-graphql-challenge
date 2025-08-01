import { TaskModel } from "@/graphql/models/taskSchema";

type AddTaskInput = {
  taskName: string;
  description: string;
  isDone: boolean;
  priority: number;
  tags: string[];
  userId: string;
};

export const addTask = async (_: any, { input }: { input: AddTaskInput }) => {
  const { taskName, description, isDone, priority, tags, userId } = input;

  if (description.length < 10) {
    throw new Error("Description must be at least 10 characters long");
  }

  if (tags.length > 5) {
    throw new Error("You can only add up to 5 tags");
  }

  const existingTask = await TaskModel.findOne({ taskName, userId });
  if (existingTask) {
    throw new Error("Task name already exists for this user");
  }

  const newTask = await TaskModel.create({
    taskName,
    description,
    isDone,
    priority,
    tags,
    userId,
  });

  return newTask;
};
