import { getDoneTasks } from "@/graphql/resolvers/queries/get-done-tasks";
import Task from "@/models/task.model";

jest.mock("../../models/task.model");

describe("getDoneTasks", () => {
  it("should return done tasks successfully", async () => {
    const mockDoneTasks = [
      {
        _id: "1",
        taskName: "Completed Task 1",
        priority: 1,
        isDone: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "2",
        taskName: "Completed Task 2",
        priority: 2,
        isDone: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (Task.find as jest.Mock).mockResolvedValue(mockDoneTasks);

    const result = await getDoneTasks();

    expect(result).toEqual(mockDoneTasks);
    expect(Task.find).toHaveBeenCalledWith({ isDone: true });
  });

  it("should throw an error if fetching done tasks fails", async () => {
    (Task.find as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(getDoneTasks()).rejects.toThrow("Error fetching done tasks");
  });
});
