import { addTask } from "@/graphql/resolvers/mutations/add-task";
import { TaskModel } from "@/mongoose/type";

jest.mock("mongoose/type", () => ({
  TaskModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        taskName: "hello",
        priority: 1,
      })
      .mockRejectedValueOnce(new Error("DB error")),
  },
}));

describe("Add task", () => {
  it("should add task with taskName and priority", async () => {
    const input = {
      taskName: "hello",
      priority: 1,
    };
    const result = await addTask({}, { input });
    expect(result).toEqual({
      taskName: "hello",
      priority: 1,
    });
  });

  it("should throw error 'failed to add task' when creation fails", async () => {
    const input = {
      taskName: "hello",
      priority: 1,
    };
    await expect(addTask({}, { input })).rejects.toThrow("failed to add task");
  });
});
