// specs/mutations/update-task.spec.ts
import { updateTask } from "@/graphql/resolvers/mutations/update-task";
import { Task } from "@/models/Task";

jest.mock("../../models/Task", () => ({
  Task: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("updateTask", () => {
  const mockUpdatedTask = {
    taskName: "Updated Task",
    isDone: true,
    priority: 2,
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update an existing task and return the updated task", async () => {
    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedTask);

    const result = await updateTask(null, {
      taskId: "123",
      task: { taskName: "Updated Task", isDone: true, priority: 2 },
    });

    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      {
        taskName: "Updated Task",
        isDone: true,
        priority: 2,
        updatedAt: expect.any(Date),
      },
      { new: true, runValidators: true }
    );

    expect(result).toEqual(mockUpdatedTask);
  });

  it("should throw an error if the task is not found", async () => {
    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateTask(null, { taskId: "123", task: {} })).rejects.toThrow(
      "Unable to update task"
    );
  });

  it("should handle errors when updating the task", async () => {
    (Task.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      new Error("Update failed")
    );

    await expect(updateTask(null, { taskId: "123", task: {} })).rejects.toThrow(
      "Unable to update task"
    );
  });
});
