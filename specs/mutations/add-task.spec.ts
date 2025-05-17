jest.mock("@/mongoose/models/task", () => {
  const mockSave = jest.fn();

  const MockTask = jest.fn().mockImplementation(function (this: any, data) {
    Object.assign(this, data);
    this.save = mockSave;
  });

  return {
    __esModule: true,
    default: MockTask,
    __mockSave: mockSave,
  };
});

import addTask from "@/graphql/resolvers/mutations/add-task";

describe("addTask Mutation", () => {
  let mockSave: jest.Mock;

  beforeEach(() => {
    const mockedModule = jest.requireMock("@/mongoose/models/task");
    mockSave = mockedModule.__mockSave;
    mockSave.mockReset();
  });

  it("should create a new task successfully", async () => {
    mockSave.mockImplementation(function (this: any) {
      return Promise.resolve(this);
    });

    const result = await addTask(
      {},
      { title: "Test Task", description: "Test Description" }
    );

    expect(result).toBeDefined();
    expect(result.title).toBe("Test Task");
    expect(result.description).toBe("Test Description");
    expect(result.isCompleted).toBe(false);
    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if title is missing", async () => {
    await expect(addTask({}, { title: "" })).rejects.toThrow(
      "Title is required"
    );
  });

  it("should handle database errors", async () => {
    mockSave.mockRejectedValue(new Error("Database error"));

    await expect(addTask({}, { title: "Test Task" })).rejects.toThrow(
      "Database error"
    );
    expect(mockSave).toHaveBeenCalledTimes(1);
  });
});
