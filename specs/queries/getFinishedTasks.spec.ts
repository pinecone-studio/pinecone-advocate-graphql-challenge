
import { getFinishedTasks } from "@/graphql/resolvers/queries/getFinishedTasks";
import TaskModel from "@/mongoose/ModelTask";
import UserModel from "@/mongoose/ModelUser";

jest.mock("@/mongoose/ModelTask");
jest.mock("@/mongoose/ModelUser");

const mockFindById = jest.fn();
const mockFindTasks = jest.fn();

(UserModel as any).findById = mockFindById;
(TaskModel as any).find = mockFindTasks;

beforeEach(() => {
    mockFindById.mockReset();
    mockFindTasks.mockReset();
});

describe("🧪 getFinishedTasks()", () => {
    it("✅ returns finished tasks if user exists", async () => {
        mockFindById.mockResolvedValue({ _id: "user123" });
        mockFindTasks.mockResolvedValue([
            { taskName: "Finished Task 1", isDone: true },
            { taskName: "Finished Task 2", isDone: true },
        ]);

        const result = await getFinishedTasks({}, { userId: "user123" });

        expect(result.success).toBe(true);
        expect(result.data?.length).toBe(2);
        expect(result.message).toMatch(/successfully/i);
    });

    it("❌ returns error if user not found", async () => {
        mockFindById.mockResolvedValue(null);

        const result = await getFinishedTasks({}, { userId: "ghost" });

        expect(result.success).toBe(false);
        expect(result.message).toMatch(/user not found/i);
    });

    it("❌ returns error if DB fails", async () => {
        mockFindById.mockResolvedValue({ _id: "user123" });
        mockFindTasks.mockRejectedValue(new Error("DB error"));

        const result = await getFinishedTasks({}, { userId: "user123" });

        expect(result.success).toBe(false);
        expect(result.message).toMatch(/error srry/i);
    });
});