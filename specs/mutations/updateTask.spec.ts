import { taskModel } from '@/graphql/models/task.models';
import { updateTask } from '@/graphql/resolvers/mutations/updateTask';

jest.mock('@/graphql/models/task.models');

describe('Update Task!!!', () => {
  it('Should throw an error if task does not exist', async () => {
    (taskModel.findById as jest.Mock).mockResolvedValue(null);
    const input = {
      id: '3',
      taskName: 'Updated Task',
      description: 'Updated description here',
      isDone: true,
      priority: 2,
      tags: ['tag1'],
      userId: '1',
    };
    await expect(updateTask({}, { input })).rejects.toThrow('Task not found');
  });

  it('Should only task owner can edit this task', async () => {
    const oldData = {
      id: '1',
      taskName: 'Task',
      description: 'Tasks description',
      isDone: true,
      priority: 2,
      tags: ['tag1'],
      userId: '1',
    };
    (taskModel.findById as jest.Mock).mockResolvedValue(oldData);

    const input = {
      _id: '1',
      taskName: 'TaskChange',
      description: 'Tasks description Change',
      isDone: false,
      priority: 1,
      tags: ['tag1', 'tag1', 'tag1'],
      userId: '2',
    };

    await expect(updateTask({}, { input })).rejects.toThrow(
      'Only the task owner can edit this task'
    );
  });

  it('Should check task name already exists.', async () => {
    (taskModel.findOne as jest.Mock).mockResolvedValue({
      _id: '100',
      taskName: 'Neg',
      userId: '1',
    });
    const input = {
      _id: '22',
      taskName: 'Neg',
      userId: '1',
    };

    await expect(updateTask({}, { input })).rejects.toThrow(
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

    await expect(updateTask({}, { input })).rejects.toThrow(
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
    await expect(updateTask({}, { input })).rejects.toThrow(
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
    await expect(updateTask({}, { input })).rejects.toThrow(
      'The number of tags must be at most 5.'
    );
  });

  it('should update task successfully', async () => {
    const oldData = {
      _id: '3',
      taskName: 'Go to school',
      description: 'Old desc',
      isDone: true,
      priority: 2,
      tags: ['tag1'],
      userId: '1',
    };

    const newData = {
      _id: '3',
      taskName: 'No',
      description: 'Nonononononono',
      isDone: false,
      priority: 1,
      tags: ['tag1'],
      userId: '1',
    };

    (taskModel.findById as jest.Mock).mockResolvedValue(oldData);
    (taskModel.findOne as jest.Mock).mockResolvedValue(null);
    (taskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(newData);

    const input = {
      id: '3',
      taskName: 'No',
      description: 'Nonononononono',
      isDone: false,
      priority: 1,
      tags: ['tag1'],
      userId: '1',
    };

    await expect(updateTask({}, { input })).resolves.toEqual(newData);
  });

  it('should cannot update task', async () => {
    const oldData = {
      _id: '3',
      taskName: 'Old',
      description: 'Old Description',
      isDone: false,
      priority: 1,
      tags: ['tag1'],
      userId: '1',
    };

    (taskModel.findById as jest.Mock).mockResolvedValue(oldData);
    (taskModel.findOne as jest.Mock).mockResolvedValue(null);
    (taskModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      new Error('DB error')
    );

    const input = {
      id: '3',
      taskName: 'New Task',
      description: 'New Description',
      isDone: true,
      priority: 2,
      tags: ['tag1'],
      userId: '1',
    };

    await expect(updateTask({}, { input })).rejects.toThrow(
      'Update task error.'
    );
  });
});
