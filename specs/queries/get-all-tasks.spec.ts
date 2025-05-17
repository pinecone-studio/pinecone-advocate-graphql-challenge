import { getAllTasks } from "@/graphql/resolvers/queries/get-all-task";
import Task from "@/mongoose/models/task";

jest.mock("@/mongoose/models/Task", () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
  },
}));

describe("getAllTasks Query", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all active tasks", async () => {
    const mockTasks = [
      {
        id: "task1",
        title: "Task 1",
        isDeleted: false,
        isCompleted: false,
      },
      {
        id: "task2",
        title: "Task 2",
        isDeleted: false,
        isCompleted: true,
      },
    ];

    (Task.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getAllTasks();

    expect(result).toEqual(mockTasks);
  });

  it("should return an empty array when no active tasks exist", async () => {
    (Task.find as jest.Mock).mockResolvedValue([]);

    const result = await getAllTasks();

    expect(result).toEqual([]);
  });

  it("should handle database errors", async () => {
    (Task.find as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(getAllTasks()).rejects.toThrow(
      "Failed to fetch tasks: Database error"
    );
  });
});
