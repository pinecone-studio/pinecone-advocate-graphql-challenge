import { todoAdd } from "@/graphql/resolvers/mutations/todo-add";

jest.mock("../../mongoose/model/todo", () => ({
  TodoModel: {
    create: jest.fn().mockResolvedValue({
      taskName: "Test Task",
      description: "Test Description",
      priority: 3,
      tags: ["tag1"],
    }),
  },
}));
describe("to do add ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should create a new task", async () => {
    const todo = {
      taskName: "Test Task",
      description: "Test Description",
      priority: 3,
      tags: ["tag1"],
    };
    let savedTodo;
    savedTodo = await todoAdd(null, { todo });
    expect(savedTodo).toEqual(todo);
  });
});
