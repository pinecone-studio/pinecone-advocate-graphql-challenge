import { addTask } from "@/graphql/resolvers/mutations/addtask";
jest.mock('@/graphql/schemas/task', () => {
    return {
        Task: jest.fn().mockImplementation(() => {
            return {
                save: jest.fn().mockResolvedValue({
                    taskName: 'Test Task',
                    priority: 1,
                    createdAt: new Date(),
                }),
            };
        }),
    };
});
describe('addTask function', () => {
    it('should add a task and take less than 5000ms', async () => {
        const startTime = Date.now();     
        const result = await addTask({}, { taskName: 'Test Task', priority: 1 });
        const endTime = Date.now();
        const duration = endTime - startTime;
        expect(result).toEqual({
            taskName: 'Test Task',
            priority: 1,
            createdAt: expect.any(Date),
        });
        expect(duration).toBeLessThan(5000);
    });

    it('should throw an error if taskName is missing', async () => {
        await expect(addTask({}, { taskName: '', priority: 1 })).rejects.toThrow('Task name is required');
    });
});
