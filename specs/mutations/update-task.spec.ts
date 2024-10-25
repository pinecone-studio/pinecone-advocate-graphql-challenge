import { addTask } from "@/graphql/resolvers/mutations/create-task-mutation";
import { updateTask } from "@/graphql/resolvers/mutations/update-task-mutation";

jest.mock("../../graphql/models/task.schema", () => ({
  taskModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        taskName: "hi",
        priority: 1,
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .mockRejectedValueOnce({}),
  },
}));

describe("Update Task Mutation", () => {
  it("Should call updateTask mutation with updated field successfully", async () => {
    const taskName = "updated Taskname";
    const priority = 2;

    const result = await updateTask({}, { updated });

    expect(result.taskName).toEqual("hi");
  });

  it("Should call addTask mutation with taskName and priority input with error", async () => {
    const taskName = "Test Task";
    const priority = 2;

    try {
      await updateTask({}, { taskName, priority });
    } catch (error) {
      expect(error).toEqual(new Error("Failed to add task"));
    }
  });
});
