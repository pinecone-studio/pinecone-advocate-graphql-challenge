import { taskModel } from "../../graphql/models/task.schema";
import { addTask } from "../../graphql/resolvers/mutations/addTask";

jest.mock("../../graphql/models/task.schema", () => ({
  taskModel: {
    create: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Add Task Mutation", () => {
  it("Should successfully add a new task with provided fields", async () => {
    const taskData = {
      taskName: "New Task",
      priority: 1,
      isDone: true,
    };

    taskModel.create.mockResolvedValueOnce({
      _id: "1",
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await addTask({}, taskData);

    expect(taskModel.create).toHaveBeenCalledWith({
      taskName: taskData.taskName,
      priority: taskData.priority,
      isDone: taskData.isDone,
    });

    expect(result).toMatchObject({
      _id: "1",
      taskName: "New Task",
      priority: 1,
      isDone: true,
    });
  });

  it("Should default 'isDone' to false if not provided", async () => {
    const taskData = {
      taskName: "Default isDone Task",
      priority: 2,
    };

    taskModel.create.mockResolvedValueOnce({
      _id: "2",
      taskName: taskData.taskName,
      priority: taskData.priority,
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await addTask({}, taskData);

    expect(taskModel.create).toHaveBeenCalledWith({
      taskName: taskData.taskName,
      priority: taskData.priority,
      isDone: false,
    });

    expect(result).toMatchObject({
      _id: "2",
      taskName: "Default isDone Task",
      priority: 2,
      isDone: false,
    });
  });

  it("Should handle errors during task creation", async () => {
    const taskData = {
      taskName: "Error Task",
      priority: 3,
      isDone: true,
    };

    taskModel.create.mockRejectedValueOnce(new Error("Failed to add task"));

    await expect(addTask({}, taskData)).rejects.toThrow("Failed to add task");
    expect(taskModel.create).toHaveBeenCalledTimes(1);
  });
});
