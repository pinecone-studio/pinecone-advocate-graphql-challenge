import { todoUpdate } from "@/graphql/resolvers/mutations/todo-update";
jest.mock("../../mongoose/model/todo", () => ({
  TodoModel: {
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      _id: "1",
      taskName: "newName",
      description: "newDes",
      priority: 2,
      tags: ["newTag"],
      isDone: true,
    }),
  },
}));
describe("should update a todo", () => {
  it("", async () => {
    const mockId = "1";
    const mockInput = {
      taskName: "newName",
      description: "newDes",
      priority: 2,
      tags: ["newTag"],
      isDone: true,
    };
    const updatedTodo = await todoUpdate(null, { todo: mockInput, id: mockId });
    expect(updatedTodo).toEqual({
      _id: "1",
      taskName: "newName",
      description: "newDes",
      priority: 2,
      tags: ["newTag"],
      isDone: true,
    });
  });
});
