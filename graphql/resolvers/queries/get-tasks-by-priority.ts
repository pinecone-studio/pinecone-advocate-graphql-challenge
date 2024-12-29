import { TodoModel } from "@/mongoose/model/todo";
export const getTaskByPriority = async (
  _: unknown,
  { priority }: { priority: String }
) => {
  const results = await TodoModel.find({ priority: priority });
  return results;
};
