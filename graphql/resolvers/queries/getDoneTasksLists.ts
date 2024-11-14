import Task from "@/models/task.model";

export const getDoneTasksLists = async () => {
  try {
    const task = await Task.find({ isDone: true });
    return task;
  } catch (error) {
    console.log(" Error get all task ", error);
  }
};
