import { getUserDoneTasksLists } from "@/graphql/resolvers/queries/getUserDoneTaskLists";
import { TaskModel } from "../../graphql/models/taskSchema";

jest.mock("../../graphql/models/taskSchema", () => ({
  TaskModel: {
    find: jest.fn(),
  },
}));

describe("getUserDoneTasksLists Query", () => {
  it("should return list of done tasks", async () => {
    const mockTasks = [
      { taskName: "Done Task 1", isDone: true },
      { taskName: "Done Task 2", isDone: true },
    ];

    (TaskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getUserDoneTasksLists();

    expect(TaskModel.find).toHaveBeenCalledWith({ isDone: true });
    expect(result).toEqual(mockTasks);
  });

  it("should return an empty array if no done tasks found", async () => {
    (TaskModel.find as jest.Mock).mockResolvedValue([]);

    const result = await getUserDoneTasksLists();

    expect(TaskModel.find).toHaveBeenCalledWith({ isDone: true });
    expect(result).toEqual([]);
  });

  it("should throw an error if database call fails", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(getUserDoneTasksLists()).rejects.toThrow("Failed to get done tasks");
  });
});
