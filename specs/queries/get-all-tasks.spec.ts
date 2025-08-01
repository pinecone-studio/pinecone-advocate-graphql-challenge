import { getAllTasks } from "../../graphql/resolvers/queries/get-all-tasks";
import { TaskModel } from "../../mongoose/task.model";

jest.mock("../../mongoose/task.model", () => {
  return {
    TaskModel: Object.assign(jest.fn(), { find: jest.fn() }),
  };
});

describe("getAllTasks", () => {
  const task = {
    _id: "1",
    taskName: "Task",
    description: "Pending task",
    isDone: false,
    priority: 3,
    tags: [],
    userId: "user123",
  };

  beforeEach(() => jest.clearAllMocks());

  it("should throw if userId missing", async () => {
    await expect(getAllTasks(null, { userId: "" })).rejects.toThrow("User not found");
  });

  it("should return all tasks for user", async () => {
    (TaskModel.find as jest.Mock).mockResolvedValue([task]);
    const res = await getAllTasks(null, { userId: "user123" });
    expect(res).toEqual([task]);
  });

  it("should throw generic error for non-Error", async () => {
    (TaskModel.find as jest.Mock).mockImplementation(() => {
      throw "weird";
    });
    await expect(getAllTasks(null, { userId: "user123" })).rejects.toThrow("Failed to fetch tasks");
  });
});
