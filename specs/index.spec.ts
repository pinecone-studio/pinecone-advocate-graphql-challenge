import { resolvers } from "../graphql/resolvers/index";
import { Task } from "../graphql/schemas/index";

jest.mock("../graphql/schemas/index");

describe("Resolvers", () => {
  describe("Query", () => {
    it("should get done tasks lists", async () => {
      const mockTasks = [{ taskName: "Test Task", isDone: true }];
      (Task.find as jest.Mock).mockResolvedValue(mockTasks);

      const result = await resolvers.Query.getDoneTasksLists();
      expect(result).toEqual(mockTasks);
    });

    it("should search tasks", async () => {
      const mockTasks = [{ taskName: "Test Task", priority: 3 }];
      (Task.find as jest.Mock).mockResolvedValue(mockTasks);

      const result = await resolvers.Query.searchTasks(null, {
        searchTerm: "Test",
        priority: 3,
      });
      expect(result).toEqual(mockTasks);
    });

    it("should get all tasks", async () => {
      const mockTasks = [{ taskName: "Test Task" }];
      (Task.find as jest.Mock).mockResolvedValue(mockTasks);

      const result = await resolvers.Query.getAllTasks();
      expect(result).toEqual(mockTasks);
    });
  });

  describe("Mutation", () => {
    it("should add a task", async () => {
      const mockTask = {
        taskName: "New Task",
        description: "A new task description",
        priority: 3,
      };
      (Task.create as jest.Mock).mockResolvedValue(mockTask);

      const result = await resolvers.Mutation.addTask(null, {
        taskName: "New Task",
        description: "A new task description",
        priority: 3,
      });
      expect(result).toEqual(mockTask);
    });

    it("should update a task", async () => {
      const mockTask = {
        taskName: "Updated Task",
        description: "Updated description",
        priority: 3,
      };
      (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockTask);

      const result = await resolvers.Mutation.updateTask(null, {
        taskId: "1",
        taskName: "Updated Task",
        description: "Updated description",
        priority: 3,
      });
      expect(result).toEqual(mockTask);
    });
  });
});
