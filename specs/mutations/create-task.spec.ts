import { createTask } from "@/graphql/resolvers/mutations/create-task-mutation";

jest.mock("../../graphql/models/task.schema.ts", () => ({
  Task: {
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

describe("Add Task Mutation", () => {
  it("Should call createTask mutation with taskName, IsDone and priority input successfully", async () => {
    const taskName = "Test Task";
    const isDone = false;
    const priority = 1;

    const result = await createTask({}, { taskName, priority, isDone });

    expect(result.taskName).toEqual("hi");
  });

  it("Should call addTask mutation with taskName and priority input with error", async () => {
    const taskName = "Test Task";
    const isDone = false;
    const priority = 2;

    try {
      await createTask({}, { taskName, priority, isDone });
    } catch (error) {
      expect(error).toEqual(new Error("Failed to create task"));
    }
  });
});