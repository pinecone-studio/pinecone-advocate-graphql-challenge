import { addTaskInput } from "../../graphql/resolvers/mutations/add-tasks";
import { TaskModel } from "../../mongoose/task.model";

jest.mock("../../mongoose/task.model", () => {
  const saveMock = jest.fn();
  return {
    TaskModel: Object.assign(
      jest.fn(() => ({ save: saveMock })),
      {
        findOne: jest.fn(),
        prototype: { save: saveMock },
      }
    ),
  };
});

describe("addTaskInput", () => {
  const baseTask = {
    taskName: "Task",
    description: "Valid description text",
    isDone: false,
    priority: 3,
    tags: [],
    userId: "user123",
  };

  beforeEach(() => jest.clearAllMocks());

  it("should throw for missing input", async () => {
    await expect(addTaskInput(null, { input: null })).rejects.toThrow("User ID is required");
  });

  it("should throw for duplicate task", async () => {
    (TaskModel.findOne as jest.Mock).mockResolvedValue(baseTask);
    await expect(addTaskInput(null, { input: baseTask })).rejects.toThrow("Task name must be unique");
  });

  it("should save successfully", async () => {
    (TaskModel.findOne as jest.Mock).mockResolvedValue(null);
    (TaskModel.prototype.save as jest.Mock).mockResolvedValue({ _id: "1", ...baseTask });
    const res = await addTaskInput(null, { input: baseTask });
    expect(res).toHaveProperty("_id", "1");
  });

  it("should throw generic error for non-Error", async () => {
    (TaskModel.findOne as jest.Mock).mockImplementation(() => {
      throw "random error";
    });
    await expect(addTaskInput(null, { input: baseTask })).rejects.toThrow("Failed to create task");
  });
});
