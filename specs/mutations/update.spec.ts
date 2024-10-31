import { updateTask } from '@/graphql/resolvers/mutations/updatetask'; 
import { Task } from '@/graphql/schemas/task';

type TaskType = {
    findByIdAndUpdate: (id: string, update: any, options?: any) => Promise<any>;
};

jest.mock('@/graphql/schemas/task', () => ({
    Task: {
        findByIdAndUpdate: jest.fn() as jest.MockedFunction<TaskType['findByIdAndUpdate']>,
    },
}));

describe('updateTask function', () => {
    it('should update a task successfully', async () => {
        const mockUpdatedTask = {
            id: '1',
            taskName: 'Updated Task',
            isDone: false,
            priority: 1,
            updatedAt: new Date(),
        };
        (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedTask);

        const result = await updateTask({}, { id: '1', taskName: 'Updated Task' });

        expect(result).toEqual(mockUpdatedTask);
        expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
            '1',
            { taskName: 'Updated Task', updatedAt: expect.any(Date) },
            { new: true, runValidators: true }
        );
    });

    it('should throw an error if the task is not found', async () => {
        (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

        await expect(updateTask({}, { id: '1' })).rejects.toThrow('Task not found');
    });

    it('should throw an error if updating fails', async () => {
        const mockError = new Error('Database error');
        (Task.findByIdAndUpdate as jest.Mock).mockRejectedValue(mockError);

        await expect(updateTask({}, { id: '1', taskName: 'Some Task' })).rejects.toThrow('Failed to update task: [Error: Database error]');
    });
});
