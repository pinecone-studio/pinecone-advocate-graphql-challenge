import { getFinishedTasksLists } from "../../graphql/resolvers/queries/get-finished-tasks-lists";
import { TaskModel } from "../../mongoose/task.model";

jest.mock("../../mongoose/task.model", () => {
  return {
    TaskModel: Object.assign(jest.fn(), { find: jest.fn() }),
  };
});

describe("getFinishedTasksLists", () => {
  const doneTask = {
    _id: "1",
    taskName: "Task",
    description: "Done task",
    isDone: true,
    priority: 3,
    tags: [],
    userId: "user123",
  };

  beforeEach(() => jest.clearAllMocks());

  it("should throw if userId missing", async () => {
    await expect(getFinishedTasksLists(null, { userId: "" })).rejects.toThrow("User not found");
  });

  it("should return finished tasks", async () => {
    (TaskModel.find as jest.Mock).mockResolvedValue([doneTask]);
    const res = await getFinishedTasksLists(null, { userId: "user123" });
    expect(res).toEqual([doneTask]);
  });

  it("should throw generic error for non-Error", async () => {
    (TaskModel.find as jest.Mock).mockImplementation(() => {
      throw "weird";
    });
    await expect(getFinishedTasksLists(null, { userId: "user123" })).rejects.toThrow("Failed to fetch tasks");
  });
});
