import { taskModel } from '@/graphql/models/task.models';
import { createTask } from '@/graphql/resolvers/mutations/createTask';

jest.mock('@/graphql/models/task.models');

describe('Create task', () => {
  it('Should check existing task name', async () => {
    (taskModel.findOne as jest.Mock).mockResolvedValue({
      taskName: 'DO OR DIE',
    });
    const input = {
      taskName: 'DO OR DIE',
      description: 'Do or die description, Do or die description',
      isDone: false,
      priority: 1,
      tags: ['1', '1', '1', '1'],
      userId: '1',
    };

    await expect(createTask({}, { input })).rejects.toThrow(
      'Task name already exists.'
    );
  });

  it('should throw an error when taskName and description are not the same.', async () => {
    (taskModel.findOne as jest.Mock).mockResolvedValue(null);
    const input = {
      taskName: 'Task1',
      description: 'Task1',
      isDone: false,
      priority: 1,
      tags: ['1', '1', '1', '1'],
      userId: '1',
    };

    await expect(createTask({}, { input })).rejects.toThrow(
      'Task name and description should not be the same'
    );
  });

  it('should validate that the description has at least 10 characters.', async () => {
    const input = {
      taskName: 'Task1',
      description: '123',
      isDone: false,
      priority: 1,
      tags: ['1', '1', '1', '1'],
      userId: '1',
    };
    await expect(createTask({}, { input })).rejects.toThrow(
      'Description length at least 10'
    );
  });

  it('should throw an error if more than 5 tags are provided.', async () => {
    const input = {
      taskName: 'Task1',
      description: '1234567890',
      isDone: false,
      priority: 1,
      tags: ['1', '2', '3', '4', '5', '6', '7'],
      userId: '1',
    };
    await expect(createTask({}, { input })).rejects.toThrow(
      'The number of tags must be at most 5.'
    );
  });

  it('should create task.', async () => {
    const input = {
      taskName: 'Task1',
      description: 'task-1 description',
      isDone: false,
      priority: 1,
      tags: ['1', '1', '1', '1'],
      userId: '1',
    };

    const newTask = {
      taskName: input.taskName,
      description: input.description,
      isDone: input.isDone,
      priority: input.priority,
      tags: input.tags,
      userId: input.userId,
    };

    (taskModel.create as jest.Mock).mockResolvedValue(newTask);
    const result = await createTask!({}, { input });
    expect(result).toEqual({
      taskName: input.taskName,
      description: input.description,
      isDone: input.isDone,
      priority: input.priority,
      tags: input.tags,
      userId: input.userId,
    });
  });

  it('should throw error.', async () => {
    const input = {
      taskName: 'task',
      description: 'description',
      isDone: false,
      priority: 2,
      tags: ['1', '2'],
      userId: '2',
    };

    (taskModel.create as jest.Mock).mockRejectedValue(
      new Error('Create task error!!!')
    );
    await expect(createTask({}, { input })).rejects.toThrow(
      'Create task error!!!'
    );
  });
});
