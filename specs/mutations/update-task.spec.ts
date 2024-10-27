import { updateTask } from "@/graphql/resolvers/mutations/update-task-mutation";
import { taskModel } from "@/graphql/models/task.schema";

jest.mock("../../graphql/models/task.schema", () => ({
  taskModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("Update Task Mutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should successfully update a task with all fields", async () => {
    const taskId = "5678";
    const taskName = "Updated Task";
    const priority = 2;
    const isDone = false;

    const mockUpdatedTask = {
      _id: taskId,
      taskName,
      priority,
      isDone,
      updatedAt: new Date(),
    };

    (taskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      mockUpdatedTask
    );

    const result = await updateTask({}, { taskId, taskName, priority, isDone });

    expect(result).toEqual(mockUpdatedTask);
    expect(taskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      taskId,
      expect.objectContaining({
        taskName,
        priority,
        isDone,
        updatedAt: expect.any(Date),
      }),
      { new: true }
    );
  });

  it("Should update only taskName and priority", async () => {
    const taskId = "5678";
    const taskName = "Updated Task Name";
    const priority = 3;

    const mockUpdatedTask = {
      _id: taskId,
      taskName,
      priority,
      updatedAt: new Date(),
    };
    (taskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      mockUpdatedTask
    );

    const result = await updateTask({}, { taskId, taskName, priority });

    expect(result).toEqual(mockUpdatedTask);
    expect(taskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      taskId,
      expect.objectContaining({
        taskName,
        priority,
        updatedAt: expect.any(Date),
      }),
      { new: true }
    );
  });

  it("Should update only isDone and priority", async () => {
    const taskId = "5678";
    const isDone = true;
    const priority = 2;

    const mockUpdatedTask = {
      _id: taskId,
      isDone,
      priority,
      updatedAt: new Date(),
    };
    (taskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      mockUpdatedTask
    );

    const result = await updateTask({}, { taskId, isDone, priority });

    expect(result).toEqual(mockUpdatedTask);
    expect(taskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      taskId,
      expect.objectContaining({
        isDone,
        priority,
        updatedAt: expect.any(Date),
      }),
      { new: true }
    );
  });

  it("Should throw an error if task is not found", async () => {
    const taskId = "nonexistent-id";
    (taskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      updateTask({}, { taskId, taskName: "New Task" })
    ).rejects.toThrow("Task not found");
  });

  it("Should throw an error if update operation fails", async () => {
    const taskId = "5678";
    const errorMessage = "Database error";
    (taskModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await expect(
      updateTask({}, { taskId, taskName: "New Task" })
    ).rejects.toThrow(`Failed to update task: ${errorMessage}`);
  });

  it("Should throw an error if no fields are provided to update", async () => {
    const taskId = "5678";

    await expect(updateTask({}, { taskId })).rejects.toThrow(
      "No fields to update"
    );
  });

  it("Should throw a generic error if a non-Error object is thrown", async () => {
    const taskId = "5678";
    (taskModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      "Unknown error"
    );

    await expect(updateTask({}, { taskId, taskName: "Task" })).rejects.toThrow(
      "Failed to update task"
    );
  });
});
