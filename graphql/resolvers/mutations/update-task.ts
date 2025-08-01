import { TaskModel } from "@/graphql/models/task-schema";

export const updateTask = async (
  _: unknown,
  {
    taskId,
    userId,
    taskName,
    description,
    priority,
    isDone,
    tags,
  }: {
    taskId: string;
    userId: string;
    taskName?: string;
    description?: string;
    priority?: number;
    isDone?: boolean;
    tags?: string[];
  }
) => {
  try {
    const existingTask = await TaskModel.findById(taskId);
    
    if (!existingTask) {
      throw new Error("Task not found");
    }

    if (existingTask.userId !== userId) {
      throw new Error("Unauthorized: You can only update your own tasks");
    }

    if (description && taskName && description === taskName) {
      throw new Error("Description cannot be the same as task name");
    }

    if (description && description.length < 10) {
      throw new Error("Description must be at least 10 characters long");
    }

    if (priority !== undefined && (priority < 1 || priority > 5)) {
      throw new Error("Priority must be between 1 and 5");
    }

  
    if (tags && tags.length > 5) {
      throw new Error("Tags array cannot have more than 5 elements");
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (taskName !== undefined) updateData.taskName = taskName;
    if (description !== undefined) updateData.description = description;
    if (priority !== undefined) updateData.priority = priority;
    if (isDone !== undefined) updateData.isDone = isDone;
    if (tags !== undefined) updateData.tags = tags;

    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("Task name must be unique for this user");
    }
    
    if (error.name === 'ValidationError') {
      throw new Error(`Validation error: ${error.message}`);
    }
    
    if (error instanceof Error) {
      throw new Error(`Failed to update task: ${error.message}`);
    }
    throw new Error("Failed to update task: Unknown error");
  }
};
