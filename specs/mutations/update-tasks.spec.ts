import { updateTaskInput } from "../../graphql/resolvers/mutations/update-tasks";
import { TaskModel } from "../../mongoose/task.model";

jest.mock("../../mongoose/task.model", () => {
  const saveMock = jest.fn();
  return {
    TaskModel: Object.assign(
      jest.fn(() => ({ save: saveMock })),
      { findById: jest.fn(), prototype: { save: saveMock } }
    ),
  };
});

describe("updateTaskInput", () => {
  const baseTask = {
    _id: "1",
    taskName: "Task",
    description: "Valid description text",
    isDone: false,
    priority: 3,
    tags: [],
    userId: "user123",
  };

  beforeEach(() => jest.clearAllMocks());

  it("should throw invalid priority", async () => {
    await expect(updateTaskInput(null, { taskId: "1", input: { ...baseTask, priority: 6 } })).rejects.toThrow(
      "Priority must be between 1 and 5"
    );
  });

  it("should throw task not found", async () => {
    (TaskModel.findById as jest.Mock).mockResolvedValue(null);
    await expect(updateTaskInput(null, { taskId: "1", input: baseTask })).rejects.toThrow("Task not found");
  });

  it("should throw unauthorized user", async () => {
    (TaskModel.findById as jest.Mock).mockResolvedValue({ ...baseTask, userId: "other" });
    await expect(updateTaskInput(null, { taskId: "1", input: baseTask })).rejects.toThrow("Unauthorized");
  });

  it("should update and save successfully", async () => {
    const mockTask = {
      ...baseTask,
      save: jest.fn().mockResolvedValue({ ...baseTask }),
    };
    (TaskModel.findById as jest.Mock).mockResolvedValue(mockTask);

    const res = await updateTaskInput(null, { taskId: "1", input: baseTask });
    expect(res).toEqual({ ...baseTask });
    expect(mockTask.save).toHaveBeenCalledTimes(1);
  });

  it("should throw generic error for non-Error", async () => {
    (TaskModel.findById as jest.Mock).mockImplementation(() => {
      throw "weird";
    });
    await expect(updateTaskInput(null, { taskId: "1", input: baseTask })).rejects.toThrow("Failed to update task");
  });
});
