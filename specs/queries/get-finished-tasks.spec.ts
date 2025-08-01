import { TaskModel } from "@/graphql/models/task-schema";
import { getUserDoneTasksLists } from "@/graphql/resolvers/queries";

jest.mock("@/graphql/models/task-schema", () => ({
  TaskModel: {
    find: jest.fn(),
    findOne: jest.fn(),
  },
}));

const mockUser = { userId: "user123" };
const baseMockTask = {
  priority: 3,
  userId: "user123",
  isDone: true,
  tags: ["work", "testing"],
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-01-01"),
};

const mockTaskWithDescription = {
  ...baseMockTask,
  taskName: "Complete unit tests",
  description: "Write comprehensive unit tests for the API",
};

const mockTaskWithoutDescription = {
  ...baseMockTask,
  taskName: "Task without description",
  // No description field
};

describe("getUserDoneTasksLists Query", () => {
  const mockFindOne = TaskModel.findOne as jest.Mock;
  const mockFind = TaskModel.find as jest.Mock;

  beforeEach(() => {
    mockFindOne.mockClear();
    mockFind.mockClear();
  });

  it("should return all completed tasks for a specific user", async () => {
    const mockTasks = [mockTaskWithDescription, {
      ...baseMockTask,
      taskName: "Grocery shopping",
      description: "Buy groceries for the week including vegetables and fruits",
      priority: 2,
      tags: ["personal", "shopping"],
    }];

    mockFindOne.mockResolvedValueOnce(mockUser);
    mockFind.mockResolvedValueOnce(mockTasks);

    const result = await getUserDoneTasksLists(null, { userId: "user123" });

    expect(mockFindOne).toHaveBeenCalledWith({ userId: "user123" });
    expect(mockFind).toHaveBeenCalledWith({
      userId: "user123",
      isDone: true,
    });
    expect(result).toHaveLength(2);
    expect(result[0].taskName).toBe("Complete unit tests");
    expect(result[1].taskName).toBe("Grocery shopping");
  });

  it("should filter out tasks without description", async () => {
    mockFindOne.mockResolvedValueOnce(mockUser);
    mockFind.mockResolvedValueOnce([mockTaskWithDescription, mockTaskWithoutDescription]);

    const result = await getUserDoneTasksLists(null, { userId: "user123" });

    expect(result).toHaveLength(1);
    expect(result[0].taskName).toBe("Complete unit tests");
  });

  it("should throw an error if user does not exist", async () => {
    mockFindOne.mockResolvedValueOnce(null);

    await expect(getUserDoneTasksLists(null, { userId: "nonexistentUser" }))
      .rejects.toThrow("User not found");

    expect(mockFind).not.toHaveBeenCalled();
  });

  it("should throw an error if fetching completed tasks fails", async () => {
    mockFindOne.mockResolvedValueOnce(mockUser);
    mockFind.mockRejectedValueOnce(new Error("Database read error"));

    await expect(getUserDoneTasksLists(null, { userId: "user123" }))
      .rejects.toThrow("Database read error");
  });

  it("should throw an error if fetching fails with non-Error exception", async () => {
    mockFindOne.mockResolvedValueOnce(mockUser);
    mockFind.mockRejectedValueOnce("String error");

    await expect(getUserDoneTasksLists(null, { userId: "user123" }))
      .rejects.toThrow("Could not retrieve completed tasks: Database read error");
  });
});