import { searchTasks } from "@/graphql/resolvers/queries/search-tasks";
import { TaskModel } from "@/mongoose/models/Task";
console.log(TaskModel);
jest.mock("@/mongoose/models/Task");

describe("searchTasks query", () => {
  const mockTasks = [
    {
      _id: "1",
      taskName: "Test Task 1",
      description: "Description 1",
      priority: 1,
      isDone: false,
      createdAt: new Date("2024-01-01"),
    },
    {
      _id: "2",
      taskName: "Test Task 2",
      description: "Description 2",
      priority: 2,
      isDone: true,
      createdAt: new Date("2024-01-02"),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (TaskModel.find as jest.Mock).mockResolvedValue(mockTasks);
  });

  it("should return all tasks when no filters are provided", async () => {
    const result = await searchTasks({}, {});
    expect(result).toEqual(mockTasks);
    expect(TaskModel.find).toHaveBeenCalledWith({});
  });

  it("should filter by search term", async () => {
    const searchTerm = "Test";
    await searchTasks({}, { searchTerm });
    expect(TaskModel.find).toHaveBeenCalledWith({
      $or: [
        { taskName: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    });
  });

  it("should filter by priority", async () => {
    const priority = 1;
    await searchTasks({}, { priority });
    expect(TaskModel.find).toHaveBeenCalledWith({ priority });
  });

  it("should filter by isDone status", async () => {
    const isDone = true;
    await searchTasks({}, { isDone });
    expect(TaskModel.find).toHaveBeenCalledWith({ isDone });
  });

  it("should filter by date range", async () => {
    const createdBefore = new Date("2024-01-02");
    const createdAfter = new Date("2024-01-01");
    await searchTasks({}, { createdBefore, createdAfter });
    expect(TaskModel.find).toHaveBeenCalledWith({
      createdAt: {
        $lt: createdBefore,
        $gt: createdAfter,
      },
    });
  });

  it("should handle database errors", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );
    await expect(searchTasks({}, {})).rejects.toThrow(
      "Failed to fetch tasks based on search criteria."
    );
  });
  it("should handle all error types", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValue("Unknown error");
    await expect(searchTasks({}, {})).rejects.toThrow(
      "Failed to fetch tasks based on search criteria."
    );
  });
  it("should filter by createdBefore only", async () => {
    const createdBefore = new Date("2024-01-02");
    await searchTasks({}, { createdBefore });
    expect(TaskModel.find).toHaveBeenCalledWith({
      createdAt: { $lt: createdBefore },
    });
  });

  it("should filter by createdAfter only", async () => {
    const createdAfter = new Date("2024-01-01");
    await searchTasks({}, { createdAfter });
    expect(TaskModel.find).toHaveBeenCalledWith({
      createdAt: { $gt: createdAfter },
    });
  });
});
