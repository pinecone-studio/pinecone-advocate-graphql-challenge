import TaskModel from "@/graphql/schemas/Task";
import { getTestServer, connectDB, disconnectDB } from "../server";

describe("addTask Mutation", () => {
  beforeAll(async () => {
    await connectDB();
    await TaskModel.deleteMany({});
  });

  beforeEach(async () => {
    await TaskModel.deleteMany({});
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("creates a new task successfully", async () => {
    const server = getTestServer();
    const response = await server.executeOperation({
      query: `
        mutation AddTask($title: String!, $description: String) {
          addTask(title: $title, description: $description) {
            id
            title
            description
            completed
          }
        }
      `,
      variables: { title: "Test task", description: "Testing" },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.addTask.title).toBe("Test task");
    expect(response.data?.addTask.description).toBe("Testing");
    expect(response.data?.addTask.completed).toBe(false);
  });
});
