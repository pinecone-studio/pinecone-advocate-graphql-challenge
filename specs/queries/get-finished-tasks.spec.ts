import { getFinishedTasks } from "@/graphql/resolvers/queries/get-finished-task";
import Task from "@/mongoose/models/task";

jest.mock("@/mongoose/models/Task", () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
  },
}));

describe("getFinishedTasksLists Query", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all deleted tasks", async () => {
    const mockDeletedTasks = [
      {
        id: "task1",
        title: "Deleted Task 1",
        isFinished: true,
        isCompleted: true,
      },
      {
        id: "task2",
        title: "Deleted Task 2",
        isFinished: true,
        isCompleted: false,
      },
    ];

    (Task.find as jest.Mock).mockResolvedValue(mockDeletedTasks);

    const result = await getFinishedTasks();

    expect(result).toEqual(mockDeletedTasks);
    expect(Task.find).toHaveBeenCalledWith({ isFinished: true });
  });

  it("should return an empty array when no deleted tasks exist", async () => {
    (Task.find as jest.Mock).mockResolvedValue([]);

    const result = await getFinishedTasks();

    expect(result).toEqual([]);
    expect(Task.find).toHaveBeenCalledWith({ isFinished: true });
  });

  it("should handle database errors", async () => {
    (Task.find as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(getFinishedTasks()).rejects.toThrow(
      "Failed to fetch finsihed tasks: Database error"
    );
  });
});
