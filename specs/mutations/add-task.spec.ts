import { TaskModel } from "@/graphql/models/task-schema";
import { addTask } from "@/graphql/resolvers/mutations/add-task";

jest.mock("@/graphql/models/task-schema", () => ({
  TaskModel: {
    create: jest.fn(),
  },
}));

describe("addTask resolver", () => {
  const mockTaskData = {
    taskName: "Test Task",
    description: "This is a test task description",
    priority: 3,
    userId: "user123",
    tags: ["work", "test"],
  };

  const mockCreatedTask = {
    ...mockTaskData,
    isDone: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create task with all fields successfully", async () => {
    (TaskModel.create as jest.Mock).mockResolvedValue(mockCreatedTask);

    const result = await addTask({}, mockTaskData);

    expect(TaskModel.create).toHaveBeenCalledWith({
      ...mockTaskData,
      isDone: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(result).toEqual(mockCreatedTask);
  });

  it("should create task without tags", async () => {
    const dataWithoutTags = { ...mockTaskData };
    delete dataWithoutTags.tags;
    
    (TaskModel.create as jest.Mock).mockResolvedValue(mockCreatedTask);

    await addTask({}, dataWithoutTags);

    expect(TaskModel.create).toHaveBeenCalledWith(
      expect.objectContaining({ tags: [] })
    );
  });

  it("should throw validation errors", async () => {
    const tests = [
      { data: { ...mockTaskData, description: mockTaskData.taskName }, error: "Description cannot be the same as task name" },
      { data: { ...mockTaskData, description: "Short" }, error: "Description must be at least 10 characters long" },
      { data: { ...mockTaskData, priority: 0 }, error: "Priority must be between 1 and 5" },
      { data: { ...mockTaskData, priority: 6 }, error: "Priority must be between 1 and 5" },
      { data: { ...mockTaskData, tags: ["1", "2", "3", "4", "5", "6"] }, error: "Tags array cannot have more than 5 elements" },
    ];

    for (const test of tests) {
      await expect(addTask({}, test.data)).rejects.toThrow(test.error);
    }
  });

  it("should handle database errors", async () => {
    const dbErrors = [
      { error: { code: 11000 }, expected: "Task name must be unique for this user" },
      { error: { name: "ValidationError", message: "Validation failed" }, expected: "Validation error: Validation failed" },
      { error: new Error("DB connection failed"), expected: "Failed to add task: DB connection failed" },
    ];

    for (const { error, expected } of dbErrors) {
      (TaskModel.create as jest.Mock).mockRejectedValue(error);
      await expect(addTask({}, mockTaskData)).rejects.toThrow(expected);
      jest.clearAllMocks();
    }
  });
});