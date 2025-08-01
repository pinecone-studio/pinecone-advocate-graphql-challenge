import { deleteTask } from "@/graphql/resolvers/mutations/delete-task";
import { TaskModel } from "@/graphql/models/task-schema";

jest.mock("@/graphql/models/task-schema", () => ({
  TaskModel: {
    findOne: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

describe("Delete Task Mutation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a task if it exists and is done", async () => {
    const mockTask = {
      _id: "123",
      taskDone: true,
    };

    (TaskModel.findOne as jest.Mock).mockResolvedValue(mockTask);
    (TaskModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockTask);

    const result = await deleteTask(null, { taskId: "123" });

    expect(TaskModel.findOne).toHaveBeenCalledWith({
      $or: [{ _id: "123" }, { taskName: undefined }],
    });
    expect(TaskModel.findByIdAndDelete).toHaveBeenCalledWith("123");
    expect(result).toBe(mockTask);
  });

  it("should throw error if task is not done", async () => {
    const mockTask = {
      _id: "123",
      taskDone: false,
    };

    (TaskModel.findOne as jest.Mock).mockResolvedValue(mockTask);

    await expect(deleteTask(null, { taskId: "123" })).rejects.toThrow(
      "Таск дуусаагүй тул устгах боломжгүй"
    );
  });

  it("should throw error if task not found", async () => {
    (TaskModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(deleteTask(null, { taskId: "not_exist" })).rejects.toThrow(
      "Таск олдсонгүй"
    );
  });

  it("should throw error if neither taskId nor taskName is provided", async () => {
    await expect(deleteTask(null, {})).rejects.toThrow(
      "Устгах таск тодорхойлогдоогүй байна"
    );
  });
});
