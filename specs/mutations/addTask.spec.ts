import { TaskModel } from "@/graphql/model/task";
import { addTask } from "@/graphql/resolvers/mutations/addtask";

jest.mock("@/graphql/model/task");

describe("addTask", () => {
  const mockCreate = TaskModel.create as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create and return a new task", async () => {
    const fakeTask = {
      taskName: "Test Task",
      category: "Test Category",
      taskDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "user123",
    };

    mockCreate.mockResolvedValue(fakeTask);

    const result = await addTask(null, {
      taskName: "Test Task",
      category: "Test Category",
      userId: "user123",
    });

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        taskName: "Test Task",
        category: "Test Category",
        taskDone: false,
        userId: "user123",
      })
    );

    expect(result).toEqual(fakeTask);
  });

  it("should throw an error if task name already exists (duplicate key)", async () => {
    const duplicateKeyError = { code: 11000, message: "Duplicate key" };
    mockCreate.mockRejectedValue(duplicateKeyError);

    await expect(
      addTask(null, {
        taskName: "Duplicate Task",
        category: "Test Category",
        userId: "user123",
      })
    ).rejects.toThrow("This task name already exists for the user.");
  });

  it("should throw a generic error for other failures", async () => {
    const genericError = new Error("Database failure");
    mockCreate.mockRejectedValue(genericError);

    await expect(
      addTask(null, {
        taskName: "Fail Task",
        category: "Test Category",
        userId: "user123",
      })
    ).rejects.toThrow("Failed to add task: Database failure");
  });
});
