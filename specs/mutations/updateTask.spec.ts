import { getTestServer, testSetup, testTeardown } from "../server";
import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";

describe("updateTask Mutation", () => {
  beforeAll(async () => {
    await testSetup();
  });

  afterAll(async () => {
    await testTeardown();
  });

  it("updates a task's title and description", async () => {
    const server = getTestServer();

    const taskId = "6856b50fd59c7de6309f30d4";

    const result = await server.executeOperation({
      query: UPDATE_TASK_MUTATION,
      variables: {
        id: taskId,
        title: "Updated Title",
        description: "Updated Description",
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.updateTask.id).toBe(taskId);
    expect(result.data?.updateTask.title).toBe("Updated Title");
  });
});
