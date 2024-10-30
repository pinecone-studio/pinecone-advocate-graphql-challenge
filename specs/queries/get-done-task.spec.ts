import { Todo } from '@/graphql/model/todoSchema';
import { getDoneTasks } from '@/graphql/resolvers/queries/get-done-status-task';

jest.mock('../../graphql/model/todoSchema', () => ({
  Todo: {
    find: jest.fn(),
  },
}));

describe('getDoneTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of done tasks', async () => {
    const mockDoneTasks = [
      { id: '1', title: 'Task 1', status: 'Done' },
      { id: '2', title: 'Task 2', status: 'Done' },
    ];

    (Todo.find as jest.Mock).mockResolvedValue(mockDoneTasks);

    const result = await getDoneTasks();

    expect(result).toEqual(mockDoneTasks);
    expect(Todo.find).toHaveBeenCalledWith({ status: 'Done' });
  });

  it('should throw an error if fetching done tasks fails', async () => {
    (Todo.find as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getDoneTasks()).rejects.toThrow(
      'Failed to retrieve the task list'
    );
  });
});
