import { addTask } from "@/graphql/resolvers/mutations/addTask";
import { TaskModel } from "../../graphql/models/taskSchema";

jest.mock("../../graphql/models/taskSchema", () => ({
  TaskModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe("addTask Mutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new task with valid input", async () => {
    (TaskModel.findOne as jest.Mock).mockResolvedValue(null);
    (TaskModel.create as jest.Mock).mockResolvedValue({
      taskName: "Test Task",
      description: "This is a test task",
      isDone: false,
      priority: 1,
      tags: [],
      userId: "testUserId",
    });

    const input = {
      taskName: "Test Task",
      description: "This is a test task",
      isDone: false,
      priority: 1,
      tags: [],
      userId: "testUserId",
    };

    const result = await addTask(null, { input });

    expect(result).toEqual({
      taskName: "Test Task",
      description: "This is a test task",
      isDone: false,
      priority: 1,
      tags: [],
      userId: "testUserId",
    });
  });

  it("should throw an error if description is less than 10 characters", async () => {
    const input = {
      taskName: "Short Task",
      description: "Too short",
      isDone: false,
      priority: 1,
      tags: [],
      userId: "testUserId",
    };

    await expect(addTask(null, { input })).rejects.toThrow("Description must be at least 10 characters long");
  });

  it("should throw an error if more than 5 tags are provided", async () => {
    const input = {
      taskName: "Too Many Tags",
      description: "This is a valid description",
      isDone: false,
      priority: 1,
      tags: ["1", "2", "3", "4", "5", "6"],
      userId: "testUserId",
    };

    await expect(addTask(null, { input })).rejects.toThrow("You can only add up to 5 tags");
  });

  it("should throw an error if taskName already exists for the user", async () => {
    (TaskModel.findOne as jest.Mock).mockResolvedValue({
      taskName: "Existing Task",
    });

    const input = {
      taskName: "Existing Task",
      description: "This is a valid description",
      isDone: false,
      priority: 1,
      tags: [],
      userId: "testUserId",
    };

    await expect(addTask(null, { input })).rejects.toThrow("Task name already exists for this user");
  });
});
