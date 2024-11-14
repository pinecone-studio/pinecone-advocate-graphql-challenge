import { getDoneTasksLists } from "@/graphql/resolvers/queries/getDoneTasksLists";
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
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: "2",
        taskName: "Completed Task 2",
        priority: 2,
        isDone: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    (Task.find as jest.Mock).mockResolvedValue(mockDoneTasks);

    const result = await getDoneTasksLists();

    expect(result).toEqual(mockDoneTasks);
    expect(Task.find).toHaveBeenCalledWith({ isDone: true });
  });

  it("should throw an error if fetching done tasks fails", async () => {
    (Task.find as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(getDoneTasksLists()).rejects.toThrow(
      "Error fetching done tasks"
    );
  });
});
