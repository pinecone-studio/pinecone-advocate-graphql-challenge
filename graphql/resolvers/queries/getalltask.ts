import { Task } from '@/graphql/schemas/task'; 
import { ITask } from '@/graphql/schemas/task'; 
export const getAllTasks = async (): Promise<ITask[]> => {
    try {
      const tasks: ITask[] = await Task.find(); 
      return tasks;
    } catch (error) {
      throw new Error(`Failed to retrieve tasks: ${error}`);
    }
  };
