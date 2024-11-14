import Task from "@/models/task.model";

export const getAllTasks = async () => {
  try {
    const task = await Task.find({});
    return task;
  } catch (error) {
    console.log(" Error get all task ", error);
  }
};
