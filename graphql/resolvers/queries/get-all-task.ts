import { Todo } from '@/graphql/model/todoSchema';

export const getAllTasks = async () => {
  try {
    const tasks = await Todo.find();
    return tasks;
  } catch (error) {
    throw new Error('Failed to retrieve the task list');
  }
};
