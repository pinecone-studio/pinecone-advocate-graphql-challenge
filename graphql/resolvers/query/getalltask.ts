import { TaskModel } from "@/graphql/model/task";

export const getAllTasks = async (
  _: unknown,
  { userId }: { userId: string }
) => {
  try {
    const tasks = await TaskModel.find({ userId });
    return tasks;
  } catch (error) {
    throw new Error("Unable to fetch tasks");
  }
};
