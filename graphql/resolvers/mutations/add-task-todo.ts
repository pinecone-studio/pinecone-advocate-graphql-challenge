import { Todo } from '@/graphql/model/todoSchema';

export const addTask = async (
  _: unknown,
  { task }: { task: { title: string; status: 'Todo' | 'InProgress' | 'Done' } }
) => {
  try {
    const { title, status } = task;

    const newTask = new Todo({
      title,
      status,
    });

    await newTask.save();
    return newTask;
  } catch (error) {
    throw new Error(`Failed to create the task: ${error}`);
  }
};
