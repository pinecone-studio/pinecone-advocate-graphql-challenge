import TaskModel from "@/graphql/schemas/Task";
import { getTestServer, connectDB, disconnectDB } from "../server";

describe("getAllTasks Query", () => {
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

  it("fetches all active tasks", async () => {
    const server = getTestServer();
    const result = await server.executeOperation({
      query: `
        query {
          getAllTasks {
            id
            title
            description
            completed
          }
        }
      `,
    });
    expect(result.errors).toBeUndefined();
    expect(result.data?.getAllTasks).toHaveLength(2);
    expect(
      result.data?.getAllTasks.every((task: any) => task.completed === false)
    ).toBe(true);
  });
});
