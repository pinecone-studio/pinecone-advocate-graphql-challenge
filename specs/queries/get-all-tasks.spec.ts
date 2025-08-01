import { TaskModel } from "@/graphql/models/task-schema";
import { getAllTasks } from "@/graphql/resolvers/queries/get-all-tasks";

jest.mock("@/graphql/models/task-schema", () => ({
  TaskModel: {
    find: jest.fn(),
  },
}));

describe("getAllTasks Query", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all tasks with description", async () => {
    const mockTasks = [
      {
        _id: "1",
        taskName: "Task 1",
        description: "Description 1",
        priority: 1,
        userId: "user1",
        isDone: false,
        tags: ["tag1"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "2",
        taskName: "Task 2",
        description: "Description 2",
        priority: 2,
        userId: "user1",
        isDone: true,
        tags: ["tag2"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (TaskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getAllTasks();

    expect(TaskModel.find).toHaveBeenCalledWith({});
    expect(result).toHaveLength(2);
    expect(result[0].description).toBe("Description 1");
    expect(result[1].description).toBe("Description 2");
  });

  it("should filter out tasks without description", async () => {
    const mockTasks = [
      {
        _id: "1",
        taskName: "Task 1",
        description: "Description 1",
        priority: 1,
        userId: "user1",
        isDone: false,
        tags: ["tag1"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "2",
        taskName: "Task 2",
        priority: 2,
        userId: "user1",
        isDone: true,
        tags: ["tag2"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (TaskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getAllTasks();

    expect(TaskModel.find).toHaveBeenCalledWith({});
    expect(result).toHaveLength(1);
    expect(result[0].description).toBe("Description 1");
  });

  it("should throw an error if fetching tasks fails", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(getAllTasks()).rejects.toThrow("Unable to fetch tasks");
  });
});
