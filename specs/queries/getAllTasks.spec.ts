// File: specs/queries/getAllTasks.spec.ts
import { taskModel } from "../../graphql/models/task.schema";
import { getAllTasks } from "../../graphql/resolvers/queries/getAllTasks";

jest.mock("../../graphql/models/task.schema", () => ({
  taskModel: {
    find: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Get All Tasks Query", () => {
  it("Should successfully retrieve all tasks", async () => {
    const mockTasks = [
      { _id: "1", taskName: "Task 1", priority: 1, isDone: false },
      { _id: "2", taskName: "Task 2", priority: 2, isDone: true },
    ];

    taskModel.find.mockResolvedValueOnce(mockTasks);

    const result = await getAllTasks();

    expect(taskModel.find).toHaveBeenCalledWith({});
    expect(result).toEqual(mockTasks);
  });

  it("Should handle errors during task retrieval", async () => {
    taskModel.find.mockRejectedValueOnce(new Error("Database error"));

    await expect(getAllTasks()).rejects.toThrow("Failed to retrieve tasks");
    expect(taskModel.find).toHaveBeenCalledTimes(1);
  });
});
