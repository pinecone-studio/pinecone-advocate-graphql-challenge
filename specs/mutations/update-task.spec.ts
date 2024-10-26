import { Task } from "@/graphql/models";
import { updateTask } from "@/graphql/resolvers/mutations";

jest.mock("../../graphql/models", () => ({
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
      taskName: "Updated Task",
      isDone: true,
      priority: 2,
    });

    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      {
        taskName: "Updated Task",
        isDone: true,
        priority: 2,
        updatedAt: expect.any(Date),
      },
      { new: true }
    );

    expect(result).toEqual(mockUpdatedTask);
  });

  it("should throw an error if the task is not found", async () => {
    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateTask(null, { taskId: "123" })).rejects.toThrow("Task not found");
});

it("should handle errors when updating the task", async () => {
    (Task.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error("Update failed"));

    await expect(updateTask(null, { taskId: "123" })).rejects.toThrow("Failed to update task: Update failed");
});

});
