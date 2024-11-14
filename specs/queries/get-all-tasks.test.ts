import { getAllTasks } from "@/graphql/resolvers/queries/get-all-tasks";
import Task from "@/models/task.model";

jest.mock("../../models/task.model");

describe("getAllTasks", () => {
  it("should return all tasks successfully", async () => {
    const mockTasks = [
      {
        _id: "1",
        taskName: "Task 1",
        priority: 1,
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "2",
        taskName: "Task 2",
        priority: 2,
        isDone: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (Task.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getAllTasks();

    expect(result).toEqual(mockTasks);
    expect(Task.find).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if fetching tasks fails", async () => {
    (Task.find as jest.Mock).mockRejectedValue(new Error("Database error"));
    await expect(getAllTasks()).rejects.toThrow("Error fetching active tasks");
  });
});
