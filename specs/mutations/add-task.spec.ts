import { addTask } from "@/graphql/resolvers/mutations/add-task";
import { TaskModel } from "@/mongoose/models/model";

jest.mock("../../mongoose/models/Model", () => ({
  TaskModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        taskName: "test",
        priority: 1,
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .mockRejectedValueOnce(new Error("Failed to create task")),
  },
}));

describe("add task mutation", () => {
  it("Should call addTask mutation with valid input successfully", async () => {
    const input = {
      taskName: "Test Task",
      priority: 1,
      isDone: false,
      description: "Valid description",
      tags: [],
    };
    const result = await addTask({}, { input });
    expect(result.taskName).toEqual("test");
  });

  it("Should throw error for invalid priority", async () => {
    const input = {
      taskName: "Test Task",
      priority: 10,
      isDone: false,
      description: "Valid description",
      tags: [],
    };

    await expect(addTask({}, { input })).rejects.toThrow(
      "Priority must be between 1 and 5"
    );
  });

  it("Should throw error for description less than 10 characters", async () => {
    const input = {
      taskName: "Test Task",
      priority: 1,
      isDone: false,
      description: "Short",
      tags: [],
    };

    await expect(addTask({}, { input })).rejects.toThrow(
      "Description must be at least 10 characters long"
    );
  });

  it("Should throw error when task creation fails", async () => {
    const input = {
      taskName: "Test Task",
      priority: 1,
      isDone: false,
      description: "Valid description",
      tags: [],
    };

    await expect(addTask({}, { input })).rejects.toThrow(
      "Failed to create task"
    );
  });
});
