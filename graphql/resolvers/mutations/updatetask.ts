import { Task } from '@/graphql/schemas/task'; 
import { ITask } from '@/graphql/schemas/task'; 
export const updateTask = async (
    _: unknown, 
    { id, taskName, isDone, priority }: { id: string; taskName?: string; isDone?: boolean; priority?: number }
  ): Promise<ITask> => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        {
          ...(taskName !== undefined && { taskName }),
          updatedAt: new Date(),
        },
        { new: true, runValidators: true } 
      );
  
      if (!updatedTask) {
        throw new Error("Task not found");
      }
      return updatedTask;
    } catch (error) {
      throw new Error(`Failed to update task: ${error}`);
    }
  };
  