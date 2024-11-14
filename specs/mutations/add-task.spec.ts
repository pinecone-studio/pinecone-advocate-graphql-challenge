import { addTask } from "@/graphql/resolvers/mutations/add-task";

jest.mock("../../models/Task", () => ({
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

describe("Add Task Mutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should call addTask mutation with taskName, IsDone and priority input successfully", async () => {
    const taskModel = require("../../models/Task").taskModel;
    taskModel.create.mockResolvedValueOnce({
      taskName: "Hi",
      priority: 1,
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const taskName = "hi";
    const priority = 1;

    const result = await addTask({}, { taskName, priority });

    expect(result).toEqual({
      taskName: "hi",
      priority: 1,
      isDone: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("Should call addTask mutation with taskName and priority input with error", async () => {
    const taskName = "Test Task";
    const priority = 2;

    try {
      await addTask({}, { taskName, priority });
    } catch (error) {
      expect(error).toEqual(new Error("Unable to add the task"));
    }
  });
});
