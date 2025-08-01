import { TaskModel } from "@/graphql/model/task";
import { getAllTasks } from "@/graphql/resolvers/query/getalltask";

jest.mock("@/graphql/model/task");

describe("getAllTasks resolver", () => {
  const mockUserId = "user123";
  const mockTasks = [
    {
      _id: "1",
      taskName: "Task 1",
      category: "Work",
      taskDone: false,
      userId: mockUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "2",
      taskName: "Task 2",
      category: "Home",
      taskDone: true,
      userId: mockUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return tasks for the given userId", async () => {
    (TaskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getAllTasks({}, { userId: mockUserId });

    expect(TaskModel.find).toHaveBeenCalledWith({ userId: mockUserId });
    expect(result).toEqual(mockTasks);
  });

  it("should throw an error if fetching fails", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(getAllTasks({}, { userId: mockUserId })).rejects.toThrow(
      "Unable to fetch tasks"
    );
  });
});
