import { addTask } from "@/graphql/resolvers/mutations/addTask";
import TaskModel from "@/mongoose/ModelTask";

jest.mock("@/mongoose/ModelTask");

const mockFindOne = jest.fn();
const mockSave = jest.fn();

(TaskModel as any).findOne = mockFindOne;

beforeEach(() => {
  mockFindOne.mockReset();
  mockSave.mockReset();
});

describe("addTask", () => {
  it("should add new task if okay", async () => {
    mockFindOne.mockResolvedValue(null);

    (TaskModel as any).mockImplementation(() => ({
      save: mockSave,
      taskName: "learn testing",
      description: "try jest",
      priority: 2,
      tags: ["dev"],
      userId: "user123",
      isDone: false,
    }));

    mockSave.mockResolvedValue(true);

    const result = await addTask({}, {
      taskName: "learn testing",
      description: "try jest",
      priority: 2,
      tags: ["dev"],
      userId: "user123"
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("added new task");
    expect(mockSave).toHaveBeenCalled();
  });

  it("should not add if same taskName exist", async () => {
    mockFindOne.mockResolvedValue({});

    const result = await addTask({}, {
      taskName: "duplicate",
      description: "something else",
      priority: 1,
      userId: "user123"
    });

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/already exist/i);
  });

  it("description same as name => error", async () => {
    mockFindOne.mockResolvedValue(null);

    const result = await addTask({}, {
      taskName: "same",
      description: "same",
      priority: 1,
      userId: "user123"
    });

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/discription cannot/i);
  });

  it("db fails => catch", async () => {
    mockFindOne.mockRejectedValue(new Error("db error"));

    const result = await addTask({}, {
      taskName: "oops",
      description: "something",
      priority: 1,
      userId: "user123"
    });

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/server error/i);
  });
});