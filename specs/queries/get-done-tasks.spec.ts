import { getDoneTasksLists } from "@/graphql/resolvers/queries/get-done";
import { TaskModel } from "@/mongoose/models/model";

jest.mock("../../mongoose/models/Model", () => ({
  TaskModel: {
    find: jest.fn(),
  },
}));

describe("getDoneTasksLists Query", () => {
  it("Should fetch all done tasks successfully", async () => {
    const mockDoneTasks = [
      {
        _id: "1",
        taskName: "Task 1",
        description: "Description 1",
        isDone: true,
      },
      {
        _id: "2",
        taskName: "Task 2",
        description: "Description 2",
        isDone: true,
      },
    ];

    (TaskModel.find as jest.Mock).mockResolvedValueOnce(mockDoneTasks);

    const result = await getDoneTasksLists();

    expect(TaskModel.find).toHaveBeenCalledWith({ isDone: true });
    expect(result).toEqual(mockDoneTasks);
  });

  it("Should return an empty array if no done tasks are found", async () => {
    (TaskModel.find as jest.Mock).mockResolvedValueOnce([]);

    const result = await getDoneTasksLists();

    expect(TaskModel.find).toHaveBeenCalledWith({ isDone: true });
    expect(result).toEqual([]);
  });

  it("Should throw an error if fetching done tasks fails", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    await expect(getDoneTasksLists()).rejects.toThrow(
      "Failed to fetch done tasks"
    );

    expect(TaskModel.find).toHaveBeenCalledWith({ isDone: true });
  });
});
