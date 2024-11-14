import { addTask } from "@/graphql/resolvers/mutations/addTask";

jest.mock("../../models/task.model", () => ({
  Task: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        taskName: "Jest task add test",
        priority: 1,
        isDone: true,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .mockRejectedValueOnce({}),
  },
}));

describe("Add task /post/ Mutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Success add task  ", async () => {
    const Task = require("../../models/task.model").Task;
    Task.create.mockResolvedValueOnce({
      taskName: "Hi",
      priority: 1,
      isDone: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const taskName = "hi";
    const priority = 1;

    const result = await addTask({}, { taskName, priority });

    expect(result).toEqual({
      taskName: "hi",
      priority: 1,
      isDone: false,
      created_at: new Date(),
      updated_at: new Date(),
    });
  });

  it("Error addtask", async () => {
    const taskName = "Test Task";
    const priority = 2;

    try {
      await addTask({}, { taskName, priority });
    } catch (error) {
      expect(error).toEqual(new Error("Failed to add task"));
    }
  });
});
