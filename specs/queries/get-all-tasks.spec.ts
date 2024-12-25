import { getAllTasks } from "../../graphql/resolvers/queries/get-all-tasks";
import { TaskModel } from "../../mongoose/models/Task";

jest.mock("../../mongoose/models/Task");

describe("getAllTasks query", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all non-deleted tasks", async () => {
    const mockTasks = [
      {
        _id: "1",
        taskName: "Task 1",
        description: "Description 1",
        isDone: false,
        priority: 3,
        tags: ["tag1"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "2",
        taskName: "Task 2",
        description: "Description 2",
        isDone: true,
        priority: 5,
        tags: ["tag2"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (TaskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getAllTasks();

    expect(result).toEqual(mockTasks);
    expect(TaskModel.find).toHaveBeenCalledWith({ isDeleted: false });
  });

  it("should throw an error when fetching tasks fails", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValue(new Error("DB Error"));

    await expect(getAllTasks()).rejects.toThrow("Failed to fetch tasks");
  });
});
