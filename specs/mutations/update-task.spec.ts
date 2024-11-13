import { UpdateTaskInput } from "@/generated";
import { updateTask } from "@/graphql/resolvers/mutations/update-task";
import { TaskModel } from "@/mongoose/type";

jest.mock("mongoose/type", () => ({
  TaskModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockImplementationOnce((id, { taskName, priority, isDone }) => ({
        _id: id,
        taskName,
        priority,
        isDone,
      }))
      .mockRejectedValueOnce(new Error("failed to update task")),
  },
}));

describe("update task", () => {
  it("should update a task by id", async () => {
    const input: UpdateTaskInput = {
      _id: "1",
      taskName: "hello",
      priority: 1,
      isDone: true,
    };
    const response = await updateTask({}, { input });
    expect(response).toEqual({
      _id: "1",
      taskName: "hello",
      priority: 1,
      isDone: true,
    });
  });

  it("should throw an error when updating a task fails", async () => {
    const input: UpdateTaskInput = { _id: "1", taskName: "hello", priority: 1, isDone: true };
    await expect(updateTask({}, { input })).rejects.toThrow("failed to update task")
  });
});
