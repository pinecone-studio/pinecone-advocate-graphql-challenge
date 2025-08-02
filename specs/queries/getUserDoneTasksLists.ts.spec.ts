import { taskModel } from '@/graphql/models/task.models';
import { getUserDoneTasksLists } from '@/graphql/resolvers/queries/getUserDoneTasksLists';

jest.mock('@/graphql/models/task.models');

describe('User done tasks lists', () => {
  it('Should throw error when user not found', async () => {
    (taskModel.findOne as jest.Mock).mockResolvedValue(null);

    const input = { userId: '3wrfoeri' };

    await expect(getUserDoneTasksLists({}, { input })).rejects.toThrow(
      'User not found'
    );
  });

  it('Should return done tasks list when user exists', async () => {
    (taskModel.findOne as jest.Mock).mockResolvedValue({ userId: '123' });

    const doneTasks = [
      { taskName: 'Task 1', isDone: true },
      { taskName: 'Task 2', isDone: true },
    ];
    (taskModel.find as jest.Mock).mockResolvedValue(doneTasks);

    const input = { userId: '123' };
    const result = await getUserDoneTasksLists({}, { input });

    expect(result).toEqual(doneTasks);
    expect(taskModel.find).toHaveBeenCalledWith({
      userId: '123',
      isDone: true,
    });
  });

  it('Should throw error if DB query fails', async () => {
    (taskModel.findOne as jest.Mock).mockResolvedValue({ userId: '123' });
    (taskModel.find as jest.Mock).mockRejectedValue(new Error('DB error'));

    const input = { userId: '123' };

    await expect(getUserDoneTasksLists({}, { input })).rejects.toThrow(
      'Get user done tasks lists error'
    );
  });
});
