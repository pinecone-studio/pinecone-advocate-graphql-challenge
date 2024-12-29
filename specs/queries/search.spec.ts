import { search } from "@/graphql/resolvers/queries/search";
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
    const tasks = await search(null, { term: "hi" });
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
