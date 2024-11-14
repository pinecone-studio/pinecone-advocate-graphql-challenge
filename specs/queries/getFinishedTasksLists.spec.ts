import { getFinishedTasksLists } from "@/graphql/resolvers/queries/getFinishedTasksLists";
import { taskModel } from "@/models/task.schema";

jest.mock("../../models/task.schema", () => ({
  taskModel: {
    find: jest.fn() as jest.Mock,
  },
}));

describe("getDoneTasksLists", () => {
  it("should return all finished tasks successfully", async () => {
    const mockFinishedTasks = [
      {
        _id: "1",
        taskName: "Task 1",
        isDone: true,
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

    (taskModel.find as jest.Mock).mockResolvedValue(mockFinishedTasks);

    const result = await getFinishedTasksLists();

    expect(result).toEqual(mockFinishedTasks);
    expect(taskModel.find).toHaveBeenCalledWith({ isDone: true });
  });

  it("should handle errors gracefully", async () => {
    const errorMessage = "An unexpected error occurred";
    (taskModel.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getFinishedTasksLists()).rejects.toThrow(
      "An unexpected error occurred"
    );
    expect(taskModel.find).toHaveBeenCalledWith({ isDone: true });
  });
});
