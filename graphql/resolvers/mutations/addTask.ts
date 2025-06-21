import TaskModel from "@/graphql/schemas/Task";

export const addTask = async (
  _parent: any,
  args: { title: string; description?: string; status?: boolean }
) => {
  const newTask = new TaskModel({
    title: args.title,
    description: args.description,
    completed: args.status || false,
  });
  await newTask.save();
  return newTask;
};
