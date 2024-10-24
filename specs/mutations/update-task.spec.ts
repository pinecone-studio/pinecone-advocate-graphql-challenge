import { taskModel } from "@/graphql/models/task.schema";

jest.mock("../../graphql/models/task.schema", () => ({
  taskModel: {
    create: jest.fn().mockResolvedValueOnce({
      taskName: "hi",
      priority: 1,
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  },
}));
