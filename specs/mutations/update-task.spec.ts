import { updateTask } from "@/graphql/resolvers/mutations/update-task-mutation";
import { taskModel } from "@/graphql/models/task.schema";

jest.mock("../../graphql/models/task.schema", () => ({
  taskModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("Update Task Mutation", () => {
  it("Should successfully update a task", async () => {
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

  it("Should throw an error if task is not found", async () => {
    const taskId = "nonexistent-id";
    (taskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null); // Mock to simulate task not found

    // Provide at least one field to ensure "No fields to update" is not triggered
    await expect(
      updateTask({}, { taskId, taskName: "New Task" })
    ).rejects.toThrow("Task not found");
  });

  it("Should throw an error if no fields are provided to update", async () => {
    const taskId = "5678";

    await expect(updateTask({}, { taskId })).rejects.toThrow(
      "No fields to update"
    );
  });
});
