import { TaskModel } from "@/graphql/models/task-schema";

export const getUserDoneTasksLists = async (
  _: unknown,
  { userId }: { userId: string }
) => {
  try {
    const userExists = await TaskModel.findOne({ userId });

    if (!userExists) {
      throw new Error("User not found");
    }

    const tasks = await TaskModel.find({
      userId: userId,
      isDone: true,
    });

    return tasks.filter((task) => task.description);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Could not retrieve completed tasks: Database read error");
  }
};
