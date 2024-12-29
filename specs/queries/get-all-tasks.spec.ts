import { getAllTasks } from "@/graphql/resolvers/queries/get-all-tasks";
jest.mock("../../mongoose/model/todo", () => ({
  TodoModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: "1",
        taskName: "name",
        description: "des",
        isDone: false,
        priority: 2,
        tags: ["hiking"],
        createdAt: 34,
        updatedAt: 45,
      },
    ]),
  },
}));
describe("Should get all tasks", () => {
  it("update a task", async () => {
    const tasks = await getAllTasks();
    expect(tasks).toEqual([
      {
        _id: "1",
        taskName: "name",
        description: "des",
        isDone: false,
        priority: 2,
        tags: ["hiking"],
        createdAt: 34,
        updatedAt: 45,
      },
    ]);
  });
});
