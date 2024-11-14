import { getAllTasks } from "@/graphql/resolvers/queries/getAllTasks";
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
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: "2",
        taskName: "Task 2",
        priority: 2,
        isDone: true,
        created_at: new Date(),
        updated_at: new Date(),
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
