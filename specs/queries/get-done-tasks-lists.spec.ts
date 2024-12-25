import { getDoneTasksLists } from "@/graphql/resolvers/queries/get-done-tasks-lists";
import { TaskModel } from "../../mongoose/models/Task";

jest.mock("../../mongoose/models/Task");

describe("getFinishedTasksLists query", () => {
  it("should return all finished tasks", async () => {
    const mockTasks = [
      {
        id: "1",
        taskName: "Task 1",
        description: "Description 1",
        isDone: true,
        priority: 3,
        tags: ["work"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        taskName: "Task 2",
        description: "Description 2",
        isDone: true,
        priority: 2,
        tags: ["personal"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (TaskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getDoneTasksLists();

    expect(result).toEqual(mockTasks);
    expect(TaskModel.find).toHaveBeenCalledWith({ isDone: true });
  });

  it("should throw error when fetch fails", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValue(new Error("DB Error"));

    await expect(getDoneTasksLists()).rejects.toThrow(
      "Failed to fetch finished tasks"
    );
  });
});
