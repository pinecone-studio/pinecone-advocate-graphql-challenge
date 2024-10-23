import { getDoneTasksLists } from "@/graphql/resolvers/queries/get-done-tasks-lists";
import { Task } from "@/models/Task";

jest.mock("../../models/Task", () => {
  return {
    Task: {
      find: jest.fn(),
    },
  };
});

describe("getDoneTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all tasks that are done", async () => {
    const mockTasks = [
      {
        taskName: "Task 1",
        isDone: true,
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Task 2",
        isDone: true,
        priority: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (Task.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getDoneTasksLists();

    expect(Task.find).toHaveBeenCalledWith({ isDone: true });

    expect(Task.find).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockTasks);
  });

  it("should handle errors when fetching done tasks", async () => {
    (Task.find as jest.Mock).mockRejectedValue(new Error("Fetch failed"));

    await expect(getDoneTasksLists()).rejects.toThrow(
      "Unable to fetch done tasks"
    );

    expect(Task.find).toHaveBeenCalledTimes(1);
  });
});
