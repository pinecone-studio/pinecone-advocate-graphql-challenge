import { taskModel } from '@/graphql/models/task.models';

export const createTask = async (_: any, { input }: { input: any }) => {
  const { taskName, description, isDone, priority, tags, userId } = input;

  const existingTask = await taskModel.findOne({ taskName });
  if (existingTask) throw new Error('Task name already exists.');

  if (description === taskName)
    throw new Error('Task name and description should not be the same');

  if (description.length < 10)
    throw new Error('Description length at least 10');

  if (tags.length >= 5)
    throw new Error('The number of tags must be at most 5.');

  try {
    const newTask = await taskModel.create(input);

    return newTask;
  } catch (error) {
    throw new Error('Create task error!!!');
  }
};
