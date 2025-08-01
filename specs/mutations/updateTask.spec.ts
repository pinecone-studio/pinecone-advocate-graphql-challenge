import { updateTask } from "@/graphql/resolvers/mutations/updateTask";
import { TaskModel } from "@/graphql/model/task";

jest.mock("@/graphql/model/task");

describe("updateTask", () => {
  const mockFindOne = TaskModel.findOne as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update and return the task successfully", async () => {
    const mockSave = jest.fn();
    const fakeTask = {
      _id: "task123",
      userId: "user123",
      taskName: "Old Task",
      category: "Old Category",
      taskDone: false,
      updatedAt: new Date(),
      save: mockSave.mockResolvedValue(true),
    };
    mockFindOne.mockResolvedValue(fakeTask);

    const result = await updateTask(null, {
      taskId: "task123",
      userId: "user123",
      taskName: "New Task",
      category: "New Category",
      taskDone: true,
    });

    expect(mockFindOne).toHaveBeenCalledWith({
      _id: "task123",
      userId: "user123",
    });
    expect(fakeTask.taskName).toBe("New Task");
    expect(fakeTask.category).toBe("New Category");
    expect(fakeTask.taskDone).toBe(true);
    expect(mockSave).toHaveBeenCalled();
    expect(result).toBe(fakeTask);
  });
  it("should update updatedAt and save even if no update fields are provided", async () => {
    const mockSave = jest.fn().mockResolvedValue(true);
    const originalUpdatedAt = new Date("2023-01-01T00:00:00Z");
    const fakeTask = {
      _id: "task123",
      userId: "user123",
      taskName: "Old Task",
      category: "Old Category",
      taskDone: false,
      updatedAt: originalUpdatedAt,
      save: mockSave,
    };
    mockFindOne.mockResolvedValue(fakeTask);

    const result = await updateTask(null, {
      taskId: "task123",
      userId: "user123",
    });

    expect(fakeTask.taskName).toBe("Old Task");
    expect(fakeTask.category).toBe("Old Category");
    expect(fakeTask.taskDone).toBe(false);
    expect(fakeTask.updatedAt).not.toEqual(originalUpdatedAt);
    expect(mockSave).toHaveBeenCalled();
    expect(result).toBe(fakeTask);
  });

  it("should not update taskDone if taskDone is not a boolean", async () => {
    const mockSave = jest.fn().mockResolvedValue(true);
    const fakeTask = {
      _id: "task123",
      userId: "user123",
      taskName: "Old Task",
      category: "Old Category",
      taskDone: false,
      updatedAt: new Date(),
      save: mockSave,
    };
    mockFindOne.mockResolvedValue(fakeTask);

    const result = await updateTask(null, {
      taskId: "task123",
      userId: "user123",
      taskName: "New Task",
      category: "New Category",
    });

    expect(fakeTask.taskDone).toBe(false);
    expect(mockSave).toHaveBeenCalled();
    expect(result).toBe(fakeTask);
  });
  it("should update and return the task without modifying taskDone if taskDone is undefined", async () => {
    const mockSave = jest.fn();
    const fakeTask = {
      _id: "task123",
      userId: "user123",
      taskName: "Old Task",
      category: "Old Category",
      taskDone: false,
      updatedAt: new Date(),
      save: mockSave.mockResolvedValue(true),
    };
    mockFindOne.mockResolvedValue(fakeTask);

    const result = await updateTask(null, {
      taskId: "task123",
      userId: "user123",
      taskName: "Updated Task",
      category: "Updated Category",
    });

    expect(fakeTask.taskDone).toBe(false);
    expect(mockSave).toHaveBeenCalled();
    expect(result).toBe(fakeTask);
  });

  it("should throw if task is not found or does not belong to user", async () => {
    mockFindOne.mockResolvedValue(null);

    await expect(
      updateTask(null, { taskId: "task123", userId: "user123" })
    ).rejects.toThrow(
      "Failed to update task: Task not found or does not belong to this user."
    );
  });

  it("should throw error on save failure", async () => {
    const mockSave = jest.fn().mockRejectedValue(new Error("DB failure"));
    const fakeTask = {
      _id: "task123",
      userId: "user123",
      taskName: "Task",
      category: "Category",
      taskDone: false,
      save: mockSave,
    };
    mockFindOne.mockResolvedValue(fakeTask);

    await expect(
      updateTask(null, {
        taskId: "task123",
        userId: "user123",
        taskName: "Updated",
      })
    ).rejects.toThrow("Failed to update task: DB failure");
  });

  it("should throw unknown error", async () => {
    mockFindOne.mockRejectedValue(new Error("Unknown error"));

    await expect(
      updateTask(null, { taskId: "task123", userId: "user123" })
    ).rejects.toThrow("Failed to update task: Unknown error");
  });
});
