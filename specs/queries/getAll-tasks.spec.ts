import { Task } from "@/graphql/models";
import { getAllTasks } from "@/graphql/resolvers/queries";

jest.mock("../../graphql/models", () => ({
  Task: {
    find: jest.fn(),
  },
}));

describe("getAllTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return all tasks", async () => {
    const mockTasks = [
      {
        taskName: "Task 1",
        isDone: false,
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Task 2",
        isDone: true,
        priority: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (Task.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getAllTasks();

    expect(Task.find).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockTasks);
  });

  it("should handle errors when fetching tasks", async () => {
    (Task.find as jest.Mock).mockRejectedValue(new Error("Fetch failed"));

    await expect(getAllTasks()).rejects.toThrow("Unable to fetch tasks");

    expect(Task.find).toHaveBeenCalledTimes(1);
  });
});
