import TodoModel from "@/mongoose/model/todo";

export const getAllTasks = async () => {
  try {
    const tasks = await TodoModel.find();
    return tasks;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
