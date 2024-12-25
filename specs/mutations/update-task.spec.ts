import { updateTask } from "../../graphql/resolvers/mutations/update-task";
import { TaskModel } from "../../mongoose/models/Task";

jest.mock("../../mongoose/models/Task");

describe("updateTask mutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update an existing task", async () => {
    const mockUpdatedTask = {
      id: "123",
      taskName: "Updated Task",
      description: "Updated Description",
      isDone: true,
      priority: 3,
      tags: ["tag1", "tag2"],
      updatedAt: new Date(),
    };

    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      mockUpdatedTask
    );

    const result = await updateTask(null, {
      taskId: "123",
      taskName: "Updated Task",
      description: "Updated Description",
      isDone: true,
      priority: 3,
      tags: ["tag1", "tag2"],
    });

    expect(result).toEqual(mockUpdatedTask);
    expect(TaskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      {
        taskName: "Updated Task",
        description: "Updated Description",
        isDone: true,
        priority: 3,
        tags: ["tag1", "tag2"],
        updatedAt: expect.any(Date),
      },
      { new: true }
    );
  });

  it("should throw an error when the task is not found", async () => {
    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      updateTask(null, {
        taskId: "123",
        taskName: "Nonexistent Task",
      })
    ).rejects.toThrow("Task not found");
  });

  it("should include error message for known errors", async () => {
    const errorMessage = "Database connection failed";
    (TaskModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await expect(
      updateTask(null, {
        taskId: "123",
        taskName: "Updated Task",
      })
    ).rejects.toThrow(`Failed to update task: ${errorMessage}`);
  });

  it("should handle unknown error types", async () => {
    (TaskModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      "Unknown error"
    );

    await expect(
      updateTask(null, {
        taskId: "123",
        taskName: "Updated Task",
      })
    ).rejects.toThrow("An unknown error occurred during task update");
  });

  it("should throw error for short description", async () => {
    // Description must be at least 10 characters
    await expect(
      updateTask(null, {
        taskId: "123",
        description: "short",
      })
    ).rejects.toThrow("Description must be at least 10 characters long");

    expect(TaskModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it("should throw error for invalid priority", async () => {
    // Priority must be between 1 and 5
    await expect(
      updateTask(null, {
        taskId: "123",
        priority: 6,
      })
    ).rejects.toThrow("Priority must be between 1 and 5");

    expect(TaskModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });
});
