import { TaskModel } from "@/graphql/models/taskSchema";

export const updateTask = async (_: any, { input }: { input: any }) => {
  const { _id, userId, taskName, description, priority, isDone, tags } = input;

  if (!userId) throw new Error("userId must be provided");

  const task = await TaskModel.findById(_id);
  if (!task) throw new Error("Task not found");
  if (task.userId.toString() !== userId) throw new Error("Unauthorized: You do not own this task");

  // Validation
  if (priority && (priority < 0 || priority > 5)) {
    throw new Error("Priority must be between 1 and 5");
  }

  if (tags?.length > 5) {
    throw new Error("You can only have up to 5 tags");
  }

  if (description?.length > 0 && description.length < 10) {
    throw new Error("Description must be at least 10 characters long");
  }

  if (taskName) {
    const exists = await TaskModel.findOne({ taskName, userId, _id: { $ne: _id } });
    if (exists) throw new Error("Task name already exists for this user");
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(
    _id,
    {
      ...(taskName && { taskName }),
      ...(description && { description }),
      ...(typeof isDone === "boolean" && { isDone }),
      ...(tags && { tags }),
      ...(typeof priority === "number" && { priority }),
      updatedAt: new Date(),
    },
    { new: true }
  );

  if (!updatedTask) throw new Error("Failed to update task");
  return updatedTask;
};
