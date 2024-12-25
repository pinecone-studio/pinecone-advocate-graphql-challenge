import { addTask } from "../../graphql/resolvers/mutations/add-task";
import { TaskModel } from "../../mongoose/models/Task";

jest.mock("../../mongoose/models/Task");

describe("addTask mutation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new task", async () => {
    const mockTask = {
      _id: "123",
      taskName: "Test Task",
      description: "Test Description",
      isDone: false,
      priority: 3,
      tags: ["tag1", "tag2"],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (TaskModel.prototype.save as jest.Mock).mockResolvedValue(mockTask);

    const result = await addTask(null, {
      input: {
        taskName: "Test Task",
        description: "Test Description",
        priority: 3,
        tags: ["tag1", "tag2"],
      },
    });

    expect(result).toEqual(mockTask);
    expect(TaskModel.prototype.save).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when description is too short", async () => {
    await expect(
      addTask(null, {
        input: {
          taskName: "Test Task",
          description: "Short",
          priority: 3,
        },
      })
    ).rejects.toThrow("Description must be at least 10 characters long");
  });

  it("should throw an error when priority is out of range", async () => {
    await expect(
      addTask(null, {
        input: {
          taskName: "Test Task",
          description: "Valid Description",
          priority: 10,
        },
      })
    ).rejects.toThrow("Priority must be between 1 and 5");
  });

  it("should throw an error when saving fails", async () => {
    (TaskModel.prototype.save as jest.Mock).mockRejectedValue(
      new Error("DB Error")
    );

    await expect(
      addTask(null, {
        input: {
          taskName: "Test Task",
          description: "Valid Description",
          priority: 3,
        },
      })
    ).rejects.toThrow("Failed to create task");
  });
});
