import { Task } from '@/graphql/schemas/task';
import { ITask } from '@/graphql/schemas/task';
export const addTask = async  (
  _: unknown,
  { taskName, priority }: { taskName: string; priority: number }
): Promise<ITask> => {
  if (!taskName) {
      throw new Error('Task name is required');
  }
  const newTask =new Task ({
      taskName,
      priority,
      createdAt: new Date(),
 });
  const savedTask = await newTask.save();
    return savedTask;
};
