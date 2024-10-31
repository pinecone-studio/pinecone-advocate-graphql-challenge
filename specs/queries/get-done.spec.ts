import { getDoneTasks } from '@/graphql/resolvers/queries/getdonetask'; 
import { Task } from '@/graphql/schemas/task'; 
import { ITask } from '@/graphql/schemas/task';

jest.mock('@/graphql/schemas/task', () => {
  return {
    Task: {
      find: jest.fn(),
    },
  };
});

describe('getDoneTasks', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should retrieve done tasks successfully', async () => {
    const mockTasks: Partial<ITask>[] = [
      {
        id: '1',
        taskName: 'Task 1',
        isDone: true,
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        taskName: 'Task 2',
        isDone: true,
        priority: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (Task.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getDoneTasks();

    expect(Task.find).toHaveBeenCalledWith({ isDone: true }); 
    expect(result).toEqual(mockTasks); 
  });

  it('should throw an error if retrieval fails', async () => {
    const errorMessage = 'Database error';
    (Task.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getDoneTasks()).rejects.toThrow(`Failed to retrieve done tasks: Error: ${errorMessage}`);
  });
});
