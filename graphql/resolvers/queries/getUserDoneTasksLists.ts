import { taskModel } from '@/graphql/models/task.models';

export const getUserDoneTasksLists = async (
  _: any,
  { input }: { input: { userId: string } }
) => {
  const { userId } = input;

  const anyTask = await taskModel.findOne({ userId });
  if (!anyTask) throw new Error('User not found');

  try {
    const userTasks = await taskModel.find({ userId, isDone: true });
    return userTasks;
  } catch (error) {
    throw new Error('Get user done tasks lists error');
  }
};
