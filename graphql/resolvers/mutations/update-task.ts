import { UpdateTaskInput } from "@/generated";
import { TaskModel } from "@/mongoose/type";

export const updateTask = async (
  _: unknown, 
  { input }: { input: UpdateTaskInput }
) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      input._id, 
      {
        taskName: input.taskName,
        priority: input.priority,
        isDone: input.isDone,
      },
      { new: true } 
    );
    return updatedTask;
  } catch (error) {
    throw new Error("failed to update task");
  }
};
