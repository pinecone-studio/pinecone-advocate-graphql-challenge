import { Task } from "@/graphql/models";

export const updateTask = async (
  _: unknown,
  {
    taskId,
    taskName,
    priority,
    isDone,
  }: { taskId: string; taskName?: string; priority?: number; isDone?: boolean }
) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        taskName,
        priority,
        isDone,
        updatedAt: new Date(), // Update the timestamp
      },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    console.log("Updated task:", updatedTask);
    return updatedTask; // Return the updated task
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error(`Failed to update task: `);
  }
};
