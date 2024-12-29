import { getDoneTasks } from "@/graphql/resolvers/queries/get-done-tasks";
jest.mock("../../mongoose/model/todo", () => ({
  TodoModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: "1",
        taskName: "name",
        description: "des",
        isDone: true,
        priority: 2,
        tags: ["hiking"],
        createdAt: 34,
        updatedAt: 45,
      },
    ]),
  },
}));
describe("Should get done tasks", () => {
  it("get done  tasks", async () => {
    const tasks = await getDoneTasks();
    expect(tasks).toEqual([
      {
        _id: "1",
        taskName: "name",
        description: "des",
        isDone: true,
        priority: 2,
        tags: ["hiking"],
        createdAt: 34,
        updatedAt: 45,
      },
    ]);
  });
});
