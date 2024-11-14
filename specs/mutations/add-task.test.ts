import { addTask } from "@/graphql/resolvers/mutations/add-task";
import Task from "@/models/task.model";

jest.mock("../../models/task.model");

describe("addTask", () => {
  it("should add a new task successfully", async () => {
    const taskName = "Test Task";
    const priority = 1;

    (Task.create as jest.Mock).mockResolvedValue({
      _id: "123",
      taskName,
      priority,
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await addTask(undefined, { taskName, priority });

    expect(result).toEqual({
      _id: "123",
      taskName,
      priority,
      isDone: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(Task.create).toHaveBeenCalledWith({ taskName, priority });
  });

  it("should throw an error if adding a task fails", async () => {
    const taskName = "Test Task";
    const priority = 1;

    (Task.create as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(addTask(undefined, { taskName, priority })).rejects.toThrow(
      "Failed to add task"
    );
  });
});
