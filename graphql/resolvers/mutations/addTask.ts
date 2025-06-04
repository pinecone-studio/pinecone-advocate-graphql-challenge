import TaskModel from "@/mongoose/ModelTask";
import { log } from "util";

type AddingTasksType = {
  taskName: string;
  description: string;
  priority: number;
  tags?: string[];
  userId: string;
};


export async function addTask(_: any, { taskName, description, priority, tags, userId }: AddingTasksType) {
  try {
    const existingTaskName = await TaskModel.findOne({ taskName, userId })
    if (existingTaskName) {
      return {
        success: false,
        message: " already exist choose different task name"
      };
    }
    if (description === taskName) {
      return {
        success: false,
        message: 'discription cannot be the same as task name',
      };
    }
    const newTask = new TaskModel({
      taskName,
      description,
      priority,
      tags,
      userId,
      isDone: false,
    });

    await newTask.save();

    return {
      success: true,
      message: "✅ added new task",
      data: newTask

    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      message: "❌ Server error while adding task.",
      data: null,
    };
  }
}


