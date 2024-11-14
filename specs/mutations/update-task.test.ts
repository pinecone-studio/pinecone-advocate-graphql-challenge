import { updateTask } from "@/graphql/resolvers/mutations/update-task";
import Task from "@/models/task.model";

jest.mock("../../models/task.model");

describe("updateTask", () => {
  it("should update a task successfully", async () => {
    const taskId = "123";
    const taskName = "Updated Task";
    const priority = 1;
    const isDone = false;

    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id: taskId,
      taskName,
      priority,
      isDone,
      updatedAt: new Date(),
    });

    const result = await updateTask(undefined, {
      taskId,
      taskName,
      priority,
      isDone,
    });

    expect(result).toEqual({
      _id: taskId,
      taskName,
      priority,
      isDone,
      updatedAt: expect.any(Date),
    });
    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
      taskId,
      { taskName, priority, isDone },
      { new: true }
    );
  });

  it("should throw an error if task not found", async () => {
    const taskId = "123";
    const taskName = "Updated Task";
    const priority = 1;
    const isDone = false;

    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      updateTask(undefined, { taskId, taskName, priority, isDone })
    ).rejects.toThrow("Task not found");
  });
});
