import { TaskModel } from "@/graphql/models/task-schema";

export const deleteTask = async (
  _: unknown,
  { taskId, taskName }: { taskId?: string; taskName?: string }
) => {
  if (!taskId && !taskName) {
    throw new Error("Устгах таск тодорхойлогдоогүй байна");
  }

  try {
    const task = await TaskModel.findOne({
      $or: [{ _id: taskId }, { taskName: taskName }],
    });

    if (!task) {
      throw new Error("Таск олдсонгүй");
    }

    if (!task.taskDone) {
      throw new Error("Таск дуусаагүй тул устгах боломжгүй");
    }

    const deletedTask = await TaskModel.findByIdAndDelete(task._id);

    return deletedTask;
  } catch (error: any) {
    throw new Error(`Таск устгахад алдаа гарлаа: ${error.message}`);
  }
};
