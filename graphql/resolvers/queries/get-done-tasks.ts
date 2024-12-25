import TodoModel from "@/mongoose/model/todo";

export const getDoneTasks = async () => {
  try {
    const tasks = await TodoModel.find({
      isDone: true,
    });
    return tasks;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
