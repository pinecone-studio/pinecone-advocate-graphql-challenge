import TaskModel from "@/mongoose/ModelTask";

export const getAllTasks = async () => {
  try {
    const allActiveTasks = await TaskModel.find({ isDone: false });

    if (allActiveTasks.length === 0) {
      return {
        success: true,
        data: [],
        message: " NO active tasks 🥺",
      };
    }

    return {
      success: true,
      data: allActiveTasks,
      message: "✅ active tasks successfully fetched",
    };
  } catch (err) {
    console.log("❌ failed to fetch tasks:", err);
    return {
      success: false,
      message: "ahh Server errooorr",
    };
  }
};