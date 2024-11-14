import { updateTask } from "@/graphql/resolvers/mutations/updateTask";
import Task from "@/models/task.model";

jest.mock("../../models/task.model");

describe("updateTask", () => {
  it("should update a task successfully", async () => {
    const taskId = "123";
    const taskName = "Updated Task";
    const priority = 1;
    const isDone = false;

    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      taskId,
      taskName: taskName,
      priority: priority,
      isDone: isDone,
      updated_at: new Date(),
    });

    const result = await updateTask(undefined, {
      _id: taskId,
      taskName,
      priority,
      isDone,
    });

    expect(result).toEqual({
      _id: taskId,
      taskName,
      priority,
      isDone,
      updated_at: expect.any(Date),
    });
    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(taskId, {
      taskName,
      priority,
      isDone,
    });
  });

  it("should throw an error if task not found", async () => {
    const taskId = "123";
    const taskName = "Updated Task";
    const priority = 1;
    const isDone = false;

    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      updateTask(undefined, { _id: taskId, taskName, priority, isDone })
    ).rejects.toThrow("Task not found");
  });
});
