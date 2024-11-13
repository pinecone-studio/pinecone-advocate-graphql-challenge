import { getDoneTaskLists } from "@/graphql/resolvers/queries/get-done-task-list";



jest.mock("mongoose/type", () => ({
    TaskModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce([
        { taskName: "Task 1", priority: 1, isDone: true },
      ])
      .mockRejectedValueOnce(new Error("Database Error")),
  },
}));

describe("Finished tasks", () => {
  it("should return finished tasks when available", async () => {
    const response = await getDoneTaskLists();
    expect(response).toEqual([
      { taskName: "Task 1", priority: 1, isDone: true },
    ]);
  });
});

it("should throw an error when there is a database error", async () => {
  await expect(getDoneTaskLists()).rejects.toThrow("Failed to fetch done tasks");
});
