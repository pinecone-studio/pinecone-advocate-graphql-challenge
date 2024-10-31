import { Task } from '@/graphql/schemas/task'; 
import { ITask } from '@/graphql/schemas/task';
export const getDoneTasks = async (): Promise<ITask[]> => {
    try {
      const tasks: ITask[] = await Task.find({ isDone: true });
      return tasks;
    } catch (error) {
      throw new Error(`Failed to retrieve done tasks: ${error}`);
    }
  };