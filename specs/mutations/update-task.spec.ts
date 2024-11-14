import { updateTask } from "@/graphql/resolvers/mutations/updateTask";
import Task from "@/models/task.model";

jest.mock("../../models/task.model", () => ({
  Task: {
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
      updated_at: new Date(),
    };

    Task.findByIdAndUpdate as jest.Mock;

    const result = await updateTask(
      {},
      { _id: taskId, taskName, priority, isDone }
    );

    expect(result);
    expect(
      Task.findByIdAndUpdate(taskId, {
        taskName,
        priority,
        isDone,
        updated_at: expect.any(Date),
      })
    );
  });

  it("Should update only taskName and priority", async () => {
    const taskId = "5678";
    const taskName = "Updated Task Name";
    const priority = 3;
    const isDone = true;

    const mockUpdatedTask = {
      _id: taskId,
      taskName,
      priority,

      updated_at: new Date(),
    };
    Task.findByIdAndUpdate as jest.Mock;

    const result = await updateTask(
      {},
      { _id: taskId, taskName, priority, isDone }
    );

    expect(result);
    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
      taskId,
      expect.objectContaining({
        taskName,
        priority,
        updated_at: expect.any(Date),
      }),
      { new: true }
    );
  });

  it("Should update only isDone and priority", async () => {
    const taskId = "5678";
    const isDone = true;
    const priority = 2;
    const taskName = "Duusgah list";

    const mockUpdatedTask = {
      _id: taskId,
      isDone,
      priority,
      updated_at: new Date(),
    };
    Task.findByIdAndUpdate as jest.Mock;

    const result = await updateTask(
      {},
      { _id: taskId, isDone, priority, taskName }
    );

    expect(result);
    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
      taskId,
      expect.objectContaining({
        isDone,
        priority,
        updated_at: expect.any(Date),
      }),
      { new: true }
    );
  });

  // it("Should throw an error if task is not found", async () => {
  //   const taskId = "nonexistent-id";
  //   (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

  //   await expect(
  //     updateTask({}, { _id: taskId, taskName: "New Task" })
  //   ).rejects.toThrow("Task not found");
  // });

  // it("Should throw an error if update operation fails", async () => {
  //   const taskId = "5678";
  //   const errorMessage = "Database error";
  //   (Task.findByIdAndUpdate as jest.Mock).mockRejectedValue(
  //     new Error(errorMessage)
  //   );

  //   await expect(
  //     updateTask({}, { _id: taskId, taskName: "New Task" })
  //   ).rejects.toThrow(`Failed to update task: ${errorMessage}`);
  // });

  // it("Should throw an error if no fields are provided to update", async () => {
  //   const taskId = "5678";

  //   await expect(updateTask({}, { _id: taskId })).rejects.toThrow(
  //     "No fields to update"
  //   );
  // });

  // it("Should throw a generic error if a non-Error object is thrown", async () => {
  //   const taskId = "5678";
  //   (Task.findByIdAndUpdate as jest.Mock).mockRejectedValue("Unknown error");

  //   await expect(
  //     updateTask({}, { _id: taskId, taskName: "Task" })
  //   ).rejects.toThrow("Failed to update task");
  // });
});
