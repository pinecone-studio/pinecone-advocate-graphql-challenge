import { Todo } from '@/graphql/model/todoSchema';
import { getAllTasks } from '@/graphql/resolvers/queries/get-all-task';

jest.mock('../../graphql/model/todoSchema', () => {
  return {
    Todo: {
      find: jest.fn(),
    },
  };
});

describe('getAllTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of tasks', async () => {
    const mockTasks = [
      { title: 'Task 1', status: 'Todo' },
      { title: 'Task 2', status: 'InProgress' },
    ];

    (Todo.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getAllTasks();

    expect(result).toEqual(mockTasks);
    expect(Todo.find).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if fetching tasks fails', async () => {
    (Todo.find as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getAllTasks()).rejects.toThrow(
      'Failed to retrieve the task list'
    );
  });
});
