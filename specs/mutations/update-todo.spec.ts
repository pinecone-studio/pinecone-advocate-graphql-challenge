// updateTask.spec.ts
import { updateTask } from "../../graphql/resolvers/mutations/todo";
import { TodoModel } from "../../graphql/schemas";

jest.mock("../../graphql/schemas", () => ({
  TodoModel: {
    findOneAndUpdate: jest.fn(),
  },
}));

describe("updateTask", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a task successfully", async () => {
    const mockUpdatedTask = {
      id: "1",
      title: "Updated Task",
      completed: true,
    };

    (TodoModel.findOneAndUpdate as jest.Mock).mockResolvedValue(
      mockUpdatedTask
    );

    const result = await updateTask(null, {
      id: "1",
      title: "Updated Task",
      completed: true,
    });

    expect(TodoModel.findOneAndUpdate).toHaveBeenCalledWith(
      { id: "1" },
      {
        $set: {
          title: "Updated Task",
          completed: true,
        },
      },
      { new: true }
    );
    expect(result).toEqual(mockUpdatedTask);
  });

  it("should throw an error if task not found", async () => {
    (TodoModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      updateTask(null, { id: "1", title: "Does not exist" })
    ).rejects.toThrow("Task not found");
  });
});
