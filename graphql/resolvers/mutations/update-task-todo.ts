import { Todo } from '@/graphql/model/todoSchema';

export const updateTask = async (
  _: unknown,
  {
    taskId,
    task,
  }: {
    taskId: string;
    task: { title: string; status: 'Todo' | 'InProgress' | 'Done' };
  }
): Promise<typeof Todo | null> => {
  try {
    const updatedTask = await Todo.findByIdAndUpdate(
      taskId,
      { ...task },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    return updatedTask;
  } catch (error) {
    throw new Error(`Failed to update the task: ${error}`);
  }
};
