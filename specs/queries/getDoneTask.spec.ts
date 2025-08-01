import { TaskModel } from "@/graphql/model/task";
import { getUserDoneTasksLists } from "@/graphql/resolvers/query/getsuerDonetask";

jest.mock("@/graphql/model/task");

describe("getUserDoneTasksLists resolver", () => {
  const mockUserId = "user123";
  const mockDoneTasks = [
    {
      _id: "1",
      taskName: "Completed Task 1",
      category: "Work",
      taskDone: true,
      userId: mockUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "2",
      taskName: "Completed Task 2",
      category: "Personal",
      taskDone: true,
      userId: mockUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all done tasks for the given userId", async () => {
    (TaskModel.find as jest.Mock).mockResolvedValue(mockDoneTasks);

    const result = await getUserDoneTasksLists({}, { userId: mockUserId });

    expect(TaskModel.find).toHaveBeenCalledWith({
      userId: mockUserId,
      taskDone: true,
    });
    expect(result).toEqual(mockDoneTasks);
  });

  it("should throw an error if fetching done tasks fails", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValue(new Error("DB Error"));

    await expect(
      getUserDoneTasksLists({}, { userId: mockUserId })
    ).rejects.toThrow("Unable to fetch done tasks");
  });
});
