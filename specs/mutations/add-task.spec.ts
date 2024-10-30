import { Todo } from '@/graphql/model/todoSchema';
import { addTask } from '@/graphql/resolvers/mutations/add-task-todo';

jest.mock('../../graphql/model/todoSchema', () => {
  const mockSave = jest.fn();
  const mockTodoInstance = {
    save: mockSave,
    title: '',
    status: '',
  };

  return {
    Todo: jest.fn(() => mockTodoInstance),
  };
});

describe('addTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully add a task', async () => {
    const taskData = { title: 'Test Task', status: 'Todo' as 'Todo' };

    (Todo as unknown as jest.Mock).mockImplementation(() => {
      const instance = {
        ...taskData,
        save: jest.fn().mockResolvedValue(taskData),
      };
      return instance;
    });

    const result = await addTask(null, { task: taskData });

    expect(Todo).toHaveBeenCalledWith(taskData);
  });

  it('should throw an error if unable to save', async () => {
    const taskData = { title: 'Test Task', status: 'Todo' as 'Todo' };

    (Todo as unknown as jest.Mock).mockImplementation(() => ({
      ...taskData,
      save: jest.fn().mockRejectedValue(new Error('Save failed')),
    }));

    await expect(addTask(null, { task: taskData })).rejects.toThrow(
      'Failed to create the task: Error: Save failed'
    );
  });
});
