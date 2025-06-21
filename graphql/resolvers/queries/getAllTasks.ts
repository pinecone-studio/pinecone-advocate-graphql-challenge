import TaskModel from "@/graphql/schemas/Task";

export const getAllTasks = async () => {
  const tasks = await TaskModel.find({ completed: false });
  return tasks.map((task) => ({
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    completed: task.completed,
  }));
};
