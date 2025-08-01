import { TaskModel } from "../../graphql/models/taskSchema";
import { updateTask } from "@/graphql/resolvers/mutations/updateTask";

jest.mock("../../graphql/models/taskSchema", () => ({
  TaskModel: { findById: jest.fn(), findOne: jest.fn(), findByIdAndUpdate: jest.fn() },
}));

describe("updateTask", () => {
  const mockFindById = TaskModel.findById as jest.Mock;
  const mockFindOne = TaskModel.findOne as jest.Mock;
  const mockFindByIdAndUpdate = TaskModel.findByIdAndUpdate as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw if userId is missing", async () => {
    await expect(updateTask(null, { input: { _id: "1" } })).rejects.toThrow("userId must be provided");
  });

  it("should throw if task is not found", async () => {
    mockFindById.mockResolvedValue(null);
    await expect(updateTask(null, { input: { _id: "1", userId: "user1" } })).rejects.toThrow("Task not found");
  });

  it("should throw if user does not own the task", async () => {
    mockFindById.mockResolvedValue({ userId: "otherUser", toString: () => "otherUser" });
    await expect(updateTask(null, { input: { _id: "1", userId: "user1" } })).rejects.toThrow("Unauthorized: You do not own this task");
  });

  it("should throw if priority is less than 0 or more than 5", async () => {
    mockFindById.mockResolvedValue({ _id: "1", userId: "user1", toString: () => "user1" });

    await expect(
      updateTask(null, {
        input: { _id: "1", userId: "user1", priority: 6 },
      })
    ).rejects.toThrow("Priority must be between 1 and 5");

    await expect(
      updateTask(null, {
        input: { _id: "1", userId: "user1", priority: -1 },
      })
    ).rejects.toThrow("Priority must be between 1 and 5");
  });

  it("should throw if more than 5 tags are provided", async () => {
    mockFindById.mockResolvedValue({ _id: "1", userId: "user1", toString: () => "user1" });

    await expect(
      updateTask(null, {
        input: {
          _id: "1",
          userId: "user1",
          tags: ["a", "b", "c", "d", "e", "f"],
        },
      })
    ).rejects.toThrow("You can only have up to 5 tags");
  });

  it("should throw if description is less than 10 characters", async () => {
    mockFindById.mockResolvedValue({ _id: "1", userId: "user1", toString: () => "user1" });

    await expect(
      updateTask(null, {
        input: {
          _id: "1",
          userId: "user1",
          description: "short",
        },
      })
    ).rejects.toThrow("Description must be at least 10 characters long");
  });

  it("should throw if taskName already exists for the user", async () => {
    mockFindById.mockResolvedValue({ _id: "1", userId: "user1", toString: () => "user1" });
    mockFindOne.mockResolvedValue({ _id: "2", taskName: "ExistingTask" });

    await expect(
      updateTask(null, {
        input: {
          _id: "1",
          userId: "user1",
          taskName: "ExistingTask",
        },
      })
    ).rejects.toThrow("Task name already exists for this user");
  });

  it("should return updated task when all inputs are valid", async () => {
    const input = {
      _id: "1",
      userId: "user1",
      taskName: "Updated Task",
      description: "This is a valid description",
      priority: 3,
      isDone: true,
      tags: ["work", "urgent"],
    };

    const existingTask = { _id: "1", userId: "user1", toString: () => "user1" };
    const updatedTask = { ...input, updatedAt: new Date() };

    mockFindById.mockResolvedValue(existingTask);
    mockFindOne.mockResolvedValue(null);
    mockFindByIdAndUpdate.mockResolvedValue(updatedTask);

    const result = await updateTask(null, { input });

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({
        taskName: "Updated Task",
        description: "This is a valid description",
        isDone: true,
        priority: 3,
        tags: ["work", "urgent"],
        updatedAt: expect.any(Date),
      }),
      { new: true }
    );

    expect(result).toEqual(updatedTask);
  });

  it("should throw if update fails (null returned)", async () => {
    mockFindById.mockResolvedValue({ _id: "1", userId: "user1", toString: () => "user1" });
    mockFindOne.mockResolvedValue(null);
    mockFindByIdAndUpdate.mockResolvedValue(null);

    await expect(
      updateTask(null, {
        input: {
          _id: "1",
          userId: "user1",
          taskName: "New name",
        },
      })
    ).rejects.toThrow("Failed to update task");
  });
});
