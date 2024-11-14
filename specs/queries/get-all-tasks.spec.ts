import { getAllTasks } from "@/graphql/resolvers/queries/getAllTasks";
import Task from "@/models/task.model";

import { expect, jest } from "@jest/globals";
jest.mock("../../models/task.model", () => ({
  Task: {
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
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: "2",
        taskName: "Task 2",
        isDone: true,
        priority: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    Task.find as jest.Mock;

    const result = await getAllTasks();

    expect(result).toEqual(mockTasks);
    expect(Task.find).toHaveBeenCalled();
  });

  it("should handle errors gracefully", async () => {
    const errorMessage = "Database error";
    Task.find as jest.Mock;

    await expect(getAllTasks()).rejects.toThrow("Failed to fetch tasks");
    expect(Task.find).toHaveBeenCalled();
  });
});
