import { searchTasks } from "@/graphql/resolvers/queries/search-tasks";
import { TaskModel } from "@/mongoose/TaskModel/Task";

jest.mock("../../mongoose/TaskModel/Task", () => ({
  TaskModel: {
    find: jest.fn(),
  },
}));

describe("searchTasks Query", () => {
  it("Should fetch tasks based on search term", async () => {
    const mockTasks = [
      { _id: "1", taskName: "Task 1", description: "Description Task 1" },
      { _id: "2", taskName: "Task 2", description: "Description Task 2" },
    ];

    const input = {
      searchTerm: "Task",
      priority: undefined,
      isDone: undefined,
      createdBefore: undefined,
      createdAfter: undefined,
    };

    (TaskModel.find as jest.Mock).mockResolvedValueOnce(mockTasks);

    const result = await searchTasks({}, { input });

    expect(TaskModel.find).toHaveBeenCalledWith({
      $or: [
        { taskName: { $regex: "Task", $options: "i" } },
        { description: { $regex: "Task", $options: "i" } },
      ],
    });
    expect(result).toEqual(mockTasks);
  });

  it("Should fetch tasks based on priority filter", async () => {
    const mockTasks = [
      {
        _id: "1",
        taskName: "Task 1",
        description: "Description 1",
        priority: 1,
      },
      {
        _id: "2",
        taskName: "Task 2",
        description: "Description 2",
        priority: 1,
      },
    ];

    const input = {
      searchTerm: undefined,
      priority: 1,
      isDone: undefined,
      createdBefore: undefined,
      createdAfter: undefined,
    };

    (TaskModel.find as jest.Mock).mockResolvedValueOnce(mockTasks);

    const result = await searchTasks({}, { input });

    expect(TaskModel.find).toHaveBeenCalledWith({ priority: 1 });
    expect(result).toEqual(mockTasks);
  });

  it("Should fetch tasks based on isDone filter", async () => {
    const mockTasks = [
      {
        _id: "1",
        taskName: "Task 1",
        description: "Description 1",
        isDone: false,
      },
      {
        _id: "2",
        taskName: "Task 2",
        description: "Description 2",
        isDone: true,
      },
    ];

    const input = {
      searchTerm: undefined,
      priority: undefined,
      isDone: true,
      createdBefore: undefined,
      createdAfter: undefined,
    };

    (TaskModel.find as jest.Mock).mockResolvedValueOnce(mockTasks);

    const result = await searchTasks({}, { input });

    expect(TaskModel.find).toHaveBeenCalledWith({ isDone: true });
    expect(result).toEqual(mockTasks);
  });

  it("Should fetch tasks based on createdAfter filter", async () => {
    const mockTasks = [
      {
        _id: "1",
        taskName: "Task 1",
        description: "Description 1",
        createdAt: new Date("2023-01-01"),
      },
    ];

    const input = {
      searchTerm: undefined,
      priority: undefined,
      isDone: undefined,
      createdBefore: undefined,
      createdAfter: new Date("2023-01-01"),
    };

    (TaskModel.find as jest.Mock).mockResolvedValueOnce(mockTasks);

    const result = await searchTasks({}, { input });

    expect(TaskModel.find).toHaveBeenCalledWith({
      createdAt: { $gt: new Date("2023-01-01") },
    });
    expect(result).toEqual(mockTasks);
  });

  it("Should fetch tasks based on multiple filters", async () => {
    const mockTasks = [
      {
        _id: "1",
        taskName: "Task 1",
        description: "Description 1",
        priority: 1,
        isDone: true,
        createdAt: new Date("2023-01-01"),
      },
    ];

    const input = {
      searchTerm: "Task",
      priority: 1,
      isDone: true,
      createdBefore: new Date("2023-02-01"),
      createdAfter: new Date("2023-01-01"),
    };

    (TaskModel.find as jest.Mock).mockResolvedValueOnce(mockTasks);

    const result = await searchTasks({}, { input });

    expect(TaskModel.find);
    expect(result).toEqual(mockTasks);
  });
  it("Should fail", async () => {
    const input = {
      searchTerm: "Task",
      priority: 1,
      isDone: true,
      createdBefore: new Date("2023-02-01"),
      createdAfter: new Date("2023-01-01"),
    };

    (TaskModel.find as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    await expect(searchTasks({}, { input })).rejects.toThrow(
      "Failed to fetch search tasks"
    );
  });
});
