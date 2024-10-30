import { Todo } from '@/graphql/model/todoSchema';

export const getDoneTasks = async () => {
  try {
    const doneTasks = await Todo.find({ status: 'Done' });
    return doneTasks;
  } catch (error) {
    throw new Error('Failed to retrieve the task list');
  }
};
