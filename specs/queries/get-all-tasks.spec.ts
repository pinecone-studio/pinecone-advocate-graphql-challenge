import { getAllTasks } from "@/graphql/resolvers/queries/get-all-tasks";
import { TaskModel } from "@/mongoose/TaskModel/Task";

jest.mock("../../mongoose/TaskModel/Task", () => ({
  TaskModel: {
    find: jest.fn(),
  },
}));

describe("getAllTasks Query", () => {
  it("Should fetch all tasks successfully", async () => {
    const mockTasks = [
      { _id: "1", taskName: "Task 1", description: "Description 1" },
      { _id: "2", taskName: "Task 2", description: "Description 2" },
    ];

    (TaskModel.find as jest.Mock).mockResolvedValueOnce(mockTasks);

    const result = await getAllTasks();

    expect(TaskModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockTasks);
  });

  it("Should return an empty array if no tasks are found", async () => {
    (TaskModel.find as jest.Mock).mockResolvedValueOnce([]);

    const result = await getAllTasks();

    expect(TaskModel.find).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it("Should throw an error if fetching tasks fails", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    await expect(getAllTasks()).rejects.toThrow("Failed to fetch tasks");

    expect(TaskModel.find).toHaveBeenCalled();
  });
});
