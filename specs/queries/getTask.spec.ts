import { getTask } from "@/graphql/resolvers/queries/getTask";
import { TaskModel } from "../../graphql/models/taskSchema";

jest.mock("../../graphql/models/taskSchema", () => ({
  TaskModel: {
    findById: jest.fn(),
  },
}));

describe("getTask Query", () => {
  const mockTask = {
    _id: "123",
    taskName: "Test Task",
    description: "A test task",
    isDone: false,
    priority: 2,
    tags: ["test"],
    userId: "user-1",
  };

  it("should return a task when found", async () => {
    (TaskModel.findById as jest.Mock).mockResolvedValue(mockTask);

    const result = await getTask({}, { id: "123" });

    expect(TaskModel.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockTask);
  });

  it("should throw an error when task is not found", async () => {
    (TaskModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getTask({}, { id: "notfound" })).rejects.toThrow("Task not found");
  });
});
