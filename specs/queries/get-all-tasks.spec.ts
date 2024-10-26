import { getAllTasks } from "@/graphql/resolvers/queries/get-all-tasks";
import { taskModel } from "@/graphql/models/task.schema";

jest.mock("../../graphql/models/task.schema", () => ({
  taskModel: {
    find: jest.fn() as jest.Mock,
  },
}));

describe("getAllTasks", () => {
  it("should return all tasks successfully", async () => {
    const mockTasks = [
      {
        _id: "1",
        taskName: "Task 1",
        isDone: false,
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "2",
        taskName: "Task 2",
        isDone: true,
        priority: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (taskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getAllTasks();

    expect(result).toEqual(mockTasks);
    expect(taskModel.find).toHaveBeenCalled();
  });

  it("should handle errors gracefully", async () => {
    const errorMessage = "Database error";
    (taskModel.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getAllTasks()).rejects.toThrow("Failed to fetch tasks");
    expect(taskModel.find).toHaveBeenCalled();
  });
});
