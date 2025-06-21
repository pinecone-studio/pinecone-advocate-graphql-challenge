import TaskModel from "@/graphql/schemas/Task";
import { getTestServer, connectDB, disconnectDB } from "../server";

describe("getFinishedTasksLists Query", () => {
  beforeAll(async () => {
    await connectDB();
    await TaskModel.deleteMany({});
  });

  beforeEach(async () => {
    await TaskModel.deleteMany({});
    await TaskModel.create([
      { title: "Task A", description: "Description A", completed: false },
      { title: "Task B", description: "Description B", completed: false },
      { title: "Task Done", description: "Description Done", completed: true },
    ]);
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("fetches all completed tasks", async () => {
    const server = getTestServer();
    const result = await server.executeOperation({
      query: `
        query {
          getFinishedTasksLists {
            id
            title
            description
            completed
          }
        }
      `,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.getFinishedTasksLists).toHaveLength(1);
    expect(result.data?.getFinishedTasksLists[0].completed).toBe(true);
  });
});
