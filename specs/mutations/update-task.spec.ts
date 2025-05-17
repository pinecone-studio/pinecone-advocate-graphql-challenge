const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();

jest.mock("mongoose", () => ({
  Types: {
    ObjectId: {
      isValid: jest.fn().mockReturnValue(true),
    },
  },
}));

jest.mock("@/mongoose/models/task", () => ({
  __esModule: true,
  default: {
    findById: mockFindById,
    findByIdAndUpdate: mockFindByIdAndUpdate,
  },
}));

let updateTask: any;

beforeAll(() => {
  const mod = require("@/graphql/resolvers/mutations/update-task");
  updateTask = mod.updateTask;
});

describe("updateTask Mutation", () => {
  beforeEach(() => {
    mockFindById.mockReset();
    mockFindByIdAndUpdate.mockReset();
    const mongoose = require("mongoose");
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
  });

  it("should update a task successfully", async () => {
    const mockTask = {
      id: "mockId",
      title: "Old Title",
      description: "Old Description",
      isCompleted: false,
      isDeleted: false,
      save: jest.fn().mockResolvedValue(true),
    };

    mockFindById.mockResolvedValue(mockTask);
    mockFindByIdAndUpdate.mockResolvedValue({
      ...mockTask,
      title: "Updated Title",
      description: "Updated Description",
    });

    const result = await updateTask(
      {},
      {
        id: "mockId",
        title: "Updated Title",
        description: "Updated Description",
      }
    );

    expect(mockFindById).toHaveBeenCalledWith("mockId");
    expect(result.title).toBe("Updated Title");
    expect(result.description).toBe("Updated Description");
  });

  it("should throw if task not found", async () => {
    mockFindById.mockResolvedValue(null);

    await expect(updateTask({}, { id: "invalidId" })).rejects.toThrow(
      "Task with ID invalidId not found"
    );
  });

  it("should throw if task ID format is invalid", async () => {
    const mongoose = require("mongoose");
    mongoose.Types.ObjectId.isValid.mockReturnValueOnce(false);

    await expect(updateTask({}, { id: "invalid-format" })).rejects.toThrow(
      "Invalid task ID format: invalid-format"
    );
  });

  it("should throw if update fails", async () => {
    const mockTask = {
      id: "mockId",
      title: "Old Title",
      description: "Old Description",
      isCompleted: false,
      isDeleted: false,
      save: jest.fn().mockResolvedValue(true),
    };

    mockFindById.mockResolvedValue(mockTask);
    mockFindByIdAndUpdate.mockRejectedValue(new Error("Database update error"));

    await expect(
      updateTask(
        {},
        {
          id: "mockId",
          title: "Updated Title",
        }
      )
    ).rejects.toThrow("Failed to update task: Database update error");
  });
});
