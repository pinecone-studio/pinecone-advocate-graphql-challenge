import { getDoneTasksLists } from "../../graphql/resolvers/queries/getDoneTasksLists";
import { taskModel } from "../../graphql/models/task.schema";

jest.mock("../../graphql/models/task.schema", () => ({
  taskModel: {
    find: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Get Done Tasks List Query", () => {
  it("Should successfully retrieve all done taskS", async () => {
    const mockDoneTasks = [
      { _id: "1", taskName: "Completed Task 1", priority: 1, isDone: true },
      { _id: "2", taskName: "Completed Task 2", priority: 2, isDone: true },
    ];

    taskModel.find.mockResolvedValueOnce(mockDoneTasks);

    const result = await getDoneTasksLists();

    expect(taskModel.find).toHaveBeenCalledWith({ isDone: true });

    expect(result).toEqual(mockDoneTasks);
  });

  it("Should handle errors during done tasks retrieval", async () => {
    taskModel.find.mockRejectedValueOnce(new Error("Database error"));

    await expect(getDoneTasksLists()).rejects.toThrow(
      "Failed to retrieve done tasks"
    );

    expect(taskModel.find).toHaveBeenCalledTimes(1);
  });
});
