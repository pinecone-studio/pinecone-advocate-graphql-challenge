import { Todo } from '@/graphql/model/todoSchema';
import { updateTask } from '@/graphql/resolvers/mutations/update-task-todo';

jest.mock('../../graphql/model/todoSchema', () => {
  return {
    Todo: {
      findByIdAndUpdate: jest.fn(),
    },
  };
});

const originalConsoleError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

type Task = {
  title: string;
  status: 'Todo' | 'InProgress' | 'Done';
};

describe('updateTask', () => {
  const mockTodo: Task = {
    title: 'Test Task',
    status: 'InProgress',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update a task', async () => {
    const taskId = '123456789012';
    (Todo.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockTodo);

    const result = await updateTask(null, { taskId, task: mockTodo });

    expect(result).toEqual(mockTodo);
    expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(taskId, mockTodo, {
      new: true,
      runValidators: true,
    });
  });

  it('should throw an error if the task is not found', async () => {
    const taskId = '123456789012';
    (Todo.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateTask(null, { taskId, task: mockTodo })).rejects.toThrow(
      `Task with ID ${taskId} not found`
    );
  });

  it('should handle errors during the update', async () => {
    const taskId = '123456789012';
    (Todo.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    await expect(updateTask(null, { taskId, task: mockTodo })).rejects.toThrow(
      'Failed to update the task: Error: Database error'
    );
  });
});
