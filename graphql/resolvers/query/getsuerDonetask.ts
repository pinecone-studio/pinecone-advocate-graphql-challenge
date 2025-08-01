import { TaskModel } from "@/graphql/model/task";

export const getUserDoneTasksLists = async (
  _: unknown,
  { userId }: { userId: string }
) => {
  try {
    const doneTasks = await TaskModel.find({ userId, taskDone: true });
    return doneTasks;
  } catch (error) {
    throw new Error("Unable to fetch done tasks");
  }
};
