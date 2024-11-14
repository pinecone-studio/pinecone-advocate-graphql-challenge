import { ObjectId } from "mongodb";

// export const AddTask = (
//   _: unknown,
//   { taskName, priority }: { taskName: string; priority: number }
// ) => {
//   const newTask = {
//     _id: new ObjectId(),
//     taskName,
//     isDone: false,
//     priority,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };

//   return newTask;
// };

import TaskModel from "@/mongoose/models/task.model";

export const AddTask = async (
  _: unknown,
  { taskName, priority }: { taskName: string; priority: number }
) => {
  try {
    const newTask = new TaskModel({
      taskName,
      priority,
    });
    const savedTask = await newTask.save();
    return savedTask;
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }
};
