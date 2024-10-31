import { getAllTasks } from '@/graphql/resolvers/queries/getalltask';
import { Task } from '@/graphql/schemas/task';

describe('getAllTasks Query', () => {
  it('should retrieve all tasks', async () => {
    const mockTasks = [
      { id: '1', taskName: 'Task 1', isDone: false, priority: 1 },
      { id: '2', taskName: 'Task 2', isDone: true, priority: 2 },
    ];
    Task.find = jest.fn().mockResolvedValue(mockTasks);
    const result = await getAllTasks();
    expect(result).toEqual(mockTasks);
  });

  it('should throw an error when retrieving tasks fails', async () => {
    const mockError = new Error('Database error');
    Task.find = jest.fn().mockRejectedValue(mockError);

    await expect(getAllTasks()).rejects.toThrow('Database error');
  });
});
