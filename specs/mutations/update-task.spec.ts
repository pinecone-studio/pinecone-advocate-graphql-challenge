import { TaskModel } from "@/graphql/models/task-schema";
import { updateTask } from "@/graphql/resolvers/mutations/update-task";

jest.mock("@/graphql/models/task-schema", () => ({
  TaskModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("updateTask resolver", () => {
  const mockExistingTask = {
    _id: "345",
    taskName: "Original task",
    description: "Original description",
    priority: 2,
    userId: "user123",
    isDone: false,
    tags: ["work"],
  };

  const mockUpdateData = {
    taskId: "345",
    userId: "user123",
    taskName: "Updated task",
    description: "Updated description",
    priority: 4,
    isDone: true,
    tags: ["updated"],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update task successfully", async () => {
    const updatedTask = { ...mockExistingTask, ...mockUpdateData };
    
    (TaskModel.findById as jest.Mock).mockResolvedValue(mockExistingTask);
    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedTask);

    const result = await updateTask(null, mockUpdateData);

    expect(TaskModel.findById).toHaveBeenCalledWith("345");
    expect(TaskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "345",
      expect.objectContaining({
        taskName: "Updated task",
        description: "Updated description",
        priority: 4,
        isDone: true,
        tags: ["updated"],
        updatedAt: expect.any(Date),
      }),
      { new: true, runValidators: true }
    );
    expect(result).toEqual(updatedTask);
  });

  it("should update partial fields", async () => {
    const partialUpdate = { taskId: "345", userId: "user123", taskName: "Partial update" };
    
    (TaskModel.findById as jest.Mock).mockResolvedValue(mockExistingTask);
    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({ ...mockExistingTask, taskName: "Partial update" });

    await updateTask(null, partialUpdate);

    expect(TaskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "345",
      { taskName: "Partial update", updatedAt: expect.any(Date) },
      { new: true, runValidators: true }
    );
  });

  it("should throw authorization and validation errors", async () => {
    const tests = [
      { setup: () => (TaskModel.findById as jest.Mock).mockResolvedValue(null), error: "Task not found" },
      { setup: () => (TaskModel.findById as jest.Mock).mockResolvedValue(mockExistingTask), data: { ...mockUpdateData, userId: "different" }, error: "Unauthorized" },
      { setup: () => (TaskModel.findById as jest.Mock).mockResolvedValue(mockExistingTask), data: { ...mockUpdateData, taskName: "Same", description: "Same" }, error: "Description cannot be the same as task name" },
      { setup: () => (TaskModel.findById as jest.Mock).mockResolvedValue(mockExistingTask), data: { ...mockUpdateData, description: "Short" }, error: "Description must be at least 10 characters long" },
      { setup: () => (TaskModel.findById as jest.Mock).mockResolvedValue(mockExistingTask), data: { ...mockUpdateData, priority: 0 }, error: "Priority must be between 1 and 5" },
      { setup: () => (TaskModel.findById as jest.Mock).mockResolvedValue(mockExistingTask), data: { ...mockUpdateData, tags: ["1", "2", "3", "4", "5", "6"] }, error: "Tags array cannot have more than 5 elements" },
    ];

    for (const test of tests) {
      test.setup();
      await expect(updateTask(null, test.data || mockUpdateData)).rejects.toThrow(test.error);
    }
  });

  it("should handle undefined fields correctly", async () => {
    (TaskModel.findById as jest.Mock).mockResolvedValue(mockExistingTask);
    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockExistingTask);

    await updateTask(null, {
      taskId: "345",
      userId: "user123",
      taskName: undefined,
      description: undefined,
      priority: undefined,
      isDone: undefined,
      tags: undefined,
    });

    expect(TaskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "345",
      { updatedAt: expect.any(Date) },
      { new: true, runValidators: true }
    );
  });

  it("should handle database errors", async () => {
    (TaskModel.findById as jest.Mock).mockResolvedValue(mockExistingTask);
    
    const dbErrors = [
      { error: { code: 11000 }, expected: "Task name must be unique for this user" },
      { error: { name: "ValidationError", message: "Validation failed" }, expected: "Validation error: Validation failed" },
      { error: new Error("DB failed"), expected: "Failed to update task: DB failed" },
      { error: "String error", expected: "Failed to update task: Unknown error" },
    ];

    for (const { error, expected } of dbErrors) {
      (TaskModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);
      await expect(updateTask(null, mockUpdateData)).rejects.toThrow(expected);
      jest.clearAllMocks();
    }
  });

  it("should handle findByIdAndUpdate returning null", async () => {
    (TaskModel.findById as jest.Mock).mockResolvedValue(mockExistingTask);
    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateTask(null, mockUpdateData)).rejects.toThrow("Task not found");
  });
});