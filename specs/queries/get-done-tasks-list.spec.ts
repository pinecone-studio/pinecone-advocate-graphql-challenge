import { getDoneTasksLists } from "@/graphql/resolvers/queries/get-done-tasks-list";
import { taskModel } from "@/graphql/models/task.schema";

jest.mock("../../graphql/models/task.schema", () => ({
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

    const result = await getDoneTasksLists();

    expect(result).toEqual(mockFinishedTasks);
    expect(taskModel.find).toHaveBeenCalledWith({ isDone: true });
  });

  it("should handle errors gracefully", async () => {
    const errorMessage = "Database error";
    (taskModel.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Change here to expect the function to throw an error
    await expect(getDoneTasksLists()).rejects.toThrow("Database error");
    expect(taskModel.find).toHaveBeenCalledWith({ isDone: true });
  });
});
