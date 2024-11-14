import { addTask } from "@/graphql/resolvers/mutations/addTask";
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
      created_at: new Date(),
      updated_at: new Date(),
    });

    const result = await addTask(undefined, { taskName, priority });

    expect(result).toEqual({
      _id: "123",
      taskName,
      priority,
      isDone: false,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
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
