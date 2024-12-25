// F:\vS\pinecone-ad\specs\mutations\todo-add.spec.ts
// F:\vS\pinecone-ad\mongoose\model\todo.ts
import TodoModel from "@/mongoose/model/todo";

jest.mock("../../mongoose/model/todo", () => {
  const mockSave = jest.fn();
  const mockTodoInstance = {
    save: mockSave,
    title: "",
    status: "",
  };
  return {
    TodoModel: jest.fn(() => mockTodoInstance),
  };
});
describe("to do add ", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Should successfully add a task", () => {});
});
