import { taskModel } from '@/graphql/models/task.models';

export const updateTask = async (_: any, { input }: { input: any }) => {
  const { id, taskName, description, isDone, priority, tags, userId } = input;

  const existing = await taskModel.findById(id);
  if (!existing) throw new Error('Task not found');

  if (existing.userId !== userId)
    throw new Error('Only the task owner can edit this task');

  const sameNameTask = await taskModel.findOne({
    userId,
    taskName,
  });

  if (sameNameTask && sameNameTask._id.toString() !== id) {
    throw new Error('Task name already exists.');
  }

  if (description === taskName)
    throw new Error('Task name and description should not be the same');

  if (description && description.length < 10) {
    throw new Error('Description length at least 10');
  }

  if (tags && tags.length > 5) {
    throw new Error('The number of tags must be at most 5.');
  }

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { taskName, description, isDone, priority, tags },
      { new: true }
    );

    return updatedTask;
  } catch (error) {
    throw new Error('Update task error.');
  }
};
