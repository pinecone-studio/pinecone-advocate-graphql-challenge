import { getDoneTasksLists } from "@/graphql/resolvers/queries/getDoneTasksLists";
import Task from "@/models/task.model";

import { expect, jest } from "@jest/globals";

jest.mock("../../models/task.model", () => ({
  Task: {
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

    const result = await getDoneTasksLists();

    expect(result).toEqual(mockFinishedTasks);
    expect(Task.find).toHaveBeenCalledWith({ isDone: true });
  });

  it("should handle errors gracefully", async () => {
    const errorMessage = "Database error";
    Task.find as jest.Mock;

    // Change here to expect the function to throw an error
    await expect(getDoneTasksLists()).rejects.toThrow("Database error");
    expect(Task.find).toHaveBeenCalledWith({ isDone: true });
  });
});
