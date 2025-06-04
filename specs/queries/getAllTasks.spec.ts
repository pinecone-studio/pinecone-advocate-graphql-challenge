import { getAllTasks } from "@/graphql/resolvers/queries/getActiveTasks";
import TaskModel from "@/mongoose/ModelTask";

jest.mock("@/mongoose/ModelTask");

const mockFind = jest.fn();
(TaskModel as any).find = mockFind;

beforeEach(() => {
  mockFind.mockReset();
});

describe("getAllTasks", () => {
  it("return list of active tasks", async () => {
    mockFind.mockResolvedValue([
      { taskName: "task 1", isDone: false },
      { taskName: "task 2", isDone: false },
    ]);

    const result = await getAllTasks();

    expect(result.success).toBe(true);
    expect(Array.isArray(result.data) && result.data.length === 2).toBe(true);
    expect(result.message).toMatch(/active tasks/i);
  });

  it("no active tasks => empty", async () => {
    mockFind.mockResolvedValue([]);

    const result = await getAllTasks();

    expect(result.success).toBe(true);
    expect(result.data).toEqual([]);
    expect(result.message).toMatch(/no active tasks/i);
  });

  it("db error => catch", async () => {
    mockFind.mockRejectedValue(new Error("db crashed"));

    const result = await getAllTasks();

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/server errooorr/i);
  });
});