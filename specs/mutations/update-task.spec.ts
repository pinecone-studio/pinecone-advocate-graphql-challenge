import { updateTask } from "@/graphql/resolvers/mutations/update-task";
import { TaskModel } from "@/mongoose/TaskModel/Task";

jest.mock("../../mongoose/TaskModel/Task", () => ({
  TaskModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("updateTask Mutation", () => {
  const mockTaskID = "23";
  const mockInput = {
    taskName: "Updated Task",
    description: "This is an updated description",
    isDone: true,
    priority: 3,
    tags: ["important"],
  };

  it("Should update task successfully", async () => {
    const mockUpdatedTask = {
      _id: mockTaskID,
      ...mockInput,
      updatedAt: new Date(),
    };

    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(
      mockUpdatedTask
    );

    const result = await updateTask(
      {},
      { input: mockInput, taskID: mockTaskID }
    );

    expect(TaskModel.findByIdAndUpdate);
    expect(result).toEqual(mockUpdatedTask);
  });

  it("Should throw an error when taskID is not provided", async () => {
    await expect(
      updateTask({}, { input: mockInput, taskID: "" })
    ).rejects.toThrow("Task ID is required");
    expect(TaskModel.findByIdAndUpdate);
  });

  it("Should throw an error when task is not found", async () => {
    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      updateTask({}, { input: mockInput, taskID: mockTaskID })
    ).rejects.toThrow(`Failed to update task`);

    expect(TaskModel.findByIdAndUpdate);
  });

  it("Should throw a generic error on update failure", async () => {
    const mockError = new Error("Database error");
    (TaskModel.findByIdAndUpdate as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(
      updateTask({}, { input: mockInput, taskID: mockTaskID })
    ).rejects.toThrow("Failed to update task");

    expect(TaskModel.findByIdAndUpdate);
  });
});
