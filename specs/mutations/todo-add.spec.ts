import { todoAdd } from "@/graphql/resolvers/mutations/todo-add";
import TodoModel from "@/mongoose/model/todo";

jest.mock("../../mongoose/model/todo", () => {
  const mockSave = jest.fn();
  const mockTodoInstance = {
    save: mockSave,
    title: "",
    status: "",
  };
  return {
    TodoModel: jest.fn(() => mockTodoInstance),
  };
});
describe("to do add ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should create a new task", async () => {
    const mockTask = {
      _id: "123",
      taskName: "Test Task",
      description: "Test Description",
      isDone: false,
      priority: 3,
      tags: ["tag1"],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (TodoModel.prototype.save as jest.Mock).mockResolvedValue(mockTask);

    const result = await todoAdd(null, {
      todo: {
        taskName: "Test Task",
        description: "Test Description",
        priority: 3,
        tags: ["tag1"],
      },
    });

    expect(result).toEqual(mockTask);
    expect(TodoModel.prototype.save).toHaveBeenCalledTimes(1);
  });
});
