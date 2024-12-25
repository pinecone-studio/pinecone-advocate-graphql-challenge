import { SearchTasksInput } from "@/generated";
import { TaskModel } from "@/mongoose/TaskModel/Task";

export const searchTasks = async (
  _: unknown,
  { input }: { input: SearchTasksInput }
) => {
  const query: any = {};
  const { searchTerm, priority, isDone, createdBefore, createdAfter } = input;

  if (searchTerm) {
    query.$or = [
      { taskName: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (priority !== undefined) {
    query.priority = priority;
  }

  if (isDone !== undefined) {
    query.isDone = isDone;
  }

  if (createdBefore) {
    query.createdAt = { ...query.createdAt, $lt: createdBefore };
  }

  if (createdAfter) {
    query.createdAt = { ...query.createdAt, $gt: createdAfter };
  }
  try {
    const results = await TaskModel.find(query);
    return results;
  } catch (error) {
    throw new Error("Failed to fetch search tasks");
  }
};
