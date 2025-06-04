import { updateTasks } from "@/graphql/resolvers/mutations/updateTask";
import TaskModel from "@/mongoose/ModelTask";
import UserModel from "@/mongoose/ModelUser";

jest.mock("@/mongoose/ModelTask");
jest.mock("@/mongoose/ModelUser");

const mockFindById_User = jest.fn();
const mockFindById_Task = jest.fn();
const mockFindByIdAndUpdate = jest.fn();

(UserModel as any).findById = mockFindById_User;
(TaskModel as any).findById = mockFindById_Task;
(TaskModel as any).findByIdAndUpdate = mockFindByIdAndUpdate;

beforeEach(() => {
    mockFindById_User.mockReset();
    mockFindById_Task.mockReset();
    mockFindByIdAndUpdate.mockReset();
});

describe("updateTasks", () => {
    it("update works if user + task exist and it's yours", async () => {
        const userId = "user123";
        const taskId = "task123";

        mockFindById_User.mockResolvedValue({ _id: userId });
        mockFindById_Task.mockResolvedValue({ _id: taskId, userId });
        mockFindByIdAndUpdate.mockResolvedValue({
            _id: taskId,
            taskName: "updated task",
            description: "updated desc",
            priority: 2,
            tags: ["dev"],
            isDone: true,
        });

        const res = await updateTasks({}, {
            id: taskId,
            userId,
            taskName: "updated task",
            description: "updated desc",
            priority: 2,
            tags: ["dev"],
            isDone: true,
        });

        expect(res.success).toBe(true);
        expect(res.data.taskName).toBe("updated task");
    });

    it("user not found => error", async () => {
        mockFindById_User.mockResolvedValue(null);

        const res = await updateTasks({}, {
            id: "task123",
            userId: "missing",
            taskName: "something"
        });

        expect(res.success).toBe(false);
        expect(res.message).toMatch(/user doesnt exist/i);
    });

    it("task not found => error", async () => {
        mockFindById_User.mockResolvedValue({ _id: "user123" });
        mockFindById_Task.mockResolvedValue(null);

        const res = await updateTasks({}, {
            id: "missing-task",
            userId: "user123",
            taskName: "something"
        });

        expect(res.success).toBe(false);
        expect(res.message).toMatch(/taks not found/i); // keep your typo
    });

    it("task not belong to user => error", async () => {
        mockFindById_User.mockResolvedValue({ _id: "user123" });
        mockFindById_Task.mockResolvedValue({ _id: "task123", userId: "someone-else" });

        const res = await updateTasks({}, {
            id: "task123",
            userId: "user123",
            taskName: "something"
        });

        expect(res.success).toBe(false);
        expect(res.message).toMatch(/not your task/i);
    });

    it("db crash => catch error", async () => {
        mockFindById_User.mockResolvedValue({ _id: "user123" });
        mockFindById_Task.mockResolvedValue({ _id: "task123", userId: "user123" });
        mockFindByIdAndUpdate.mockRejectedValue(new Error("crash"));

        const res = await updateTasks({}, {
            id: "task123",
            userId: "user123",
            taskName: "something"
        });

        expect(res.success).toBe(false);
        expect(res.message).toMatch(/failed to update/i);
    });
});