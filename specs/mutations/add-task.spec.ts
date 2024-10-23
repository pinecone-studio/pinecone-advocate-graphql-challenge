import { addTask } from "@/graphql/resolvers/mutations/add-task";
import { Task } from "@/models/Task";

jest.mock("../../models/Task", () => {
  return {
    Task: jest.fn().mockImplementation(() => {
      return {
        save: jest.fn(),
      };
    }),
  };
});

describe("addTask", () => {
  const mockSave = jest.fn();
  const MockedTask = Task as jest.MockedClass<typeof Task>;

  beforeEach(() => {
    jest.clearAllMocks();

    MockedTask.mockImplementation(() => ({
      save: mockSave,
      taskName: "Test Task",
      isDone: false,
      priority: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  });

  it("should create a new task and save it", async () => {
    const taskData = { taskName: "Test Task", isDone: false, priority: 1 };

    mockSave.mockResolvedValueOnce(undefined);

    const result = await addTask(null, { task: taskData });

    expect(MockedTask).toHaveBeenCalledWith({
      taskName: taskData.taskName,
      isDone: taskData.isDone,
      priority: taskData.priority,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    expect(mockSave).toHaveBeenCalledTimes(1);

    expect(result).toMatchObject({
      taskName: taskData.taskName,
      isDone: taskData.isDone,
      priority: taskData.priority,
    });
  });

  it("should throw an error when unable to create a task", async () => {
    const taskData = { taskName: "Test Task", priority: 1 };

    mockSave.mockRejectedValueOnce(new Error("Save failed"));

    await expect(addTask(null, { task: taskData })).rejects.toThrow(
      "Unable to create task"
    );

    expect(mockSave).toHaveBeenCalledTimes(1);
  });
});
