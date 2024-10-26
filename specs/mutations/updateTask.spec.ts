import { taskModel } from "../../graphql/models/task.schema";
import { updateTask } from "../../graphql/resolvers/mutations/updateTask";

jest.mock("../../graphql/models/task.schema", () => ({
  taskModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Update Task Mutation", () => {
  it("Should successfully update the task with provided fields", async () => {
    taskModel.findByIdAndUpdate.mockResolvedValueOnce({
      _id: "1",
      taskName: "hi",
      priority: 1,
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const taskData = {
      _id: "1",
      taskName: "updated Taskname",
      priority: 2,
      isDone: true,
    };

    const result = await updateTask({}, taskData);

    expect(taskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      taskData._id,
      {
        taskName: taskData.taskName,
        priority: taskData.priority,
        isDone: taskData.isDone,
      },
      { new: true }
    );

    expect(result).toMatchObject({
      taskName: "hi",
      priority: 1,
      isDone: false,
    });
  });

  it("Should throw an error if task is not found", async () => {
    taskModel.findByIdAndUpdate.mockResolvedValueOnce(null);

    const taskData = {
      _id: "nonexistent_id",
      taskName: "Test Task",
      priority: 2,
      isDone: true,
    };

    await expect(updateTask({}, taskData)).rejects.toThrow(
      "Failed to update task"
    );
    expect(taskModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
  });

  it("Should catch unexpected errors and throw 'Failed to update task'", async () => {
    taskModel.findByIdAndUpdate.mockImplementationOnce(() => {
      throw new Error("Unexpected database error");
    });

    const taskData = {
      _id: "1",
      taskName: "Task with DB issue",
      priority: 3,
      isDone: false,
    };

    await expect(updateTask({}, taskData)).rejects.toThrow(
      "Failed to update task"
    );
    expect(taskModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
  });

  it("Should default 'isDone' to false if not provided", async () => {
    taskModel.findByIdAndUpdate.mockResolvedValueOnce({
      _id: "1",
      taskName: "Task without isDone",
      priority: 2,
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const taskData = {
      _id: "1",
      taskName: "Task without isDone",
      priority: 2,
    };

    const result = await updateTask({}, taskData);

    expect(taskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      taskData._id,
      {
        taskName: taskData.taskName,
        priority: taskData.priority,
        isDone: false,
      },
      { new: true }
    );

    expect(result).toMatchObject({
      taskName: "Task without isDone",
      priority: 2,
      isDone: false,
    });
  });
});
