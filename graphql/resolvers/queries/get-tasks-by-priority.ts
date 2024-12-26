import TodoModel from "@/mongoose/model/todo";
export const getTaskByPriority = async (
  _: unknown,
  { priority }: { priority: String }
) => {
  try {
    const results = await TodoModel.find({ priority: priority });
    return results;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
