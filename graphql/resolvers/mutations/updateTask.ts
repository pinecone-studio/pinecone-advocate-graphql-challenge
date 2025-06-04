import TaskModel from "@/mongoose/ModelTask";
import UserModel from "@/mongoose/ModelUser";

export const updateTasks = async (_: any, args: {
    id: string,
    taskName?: string;
    description?: string;
    isDone?: boolean;
    priority?: number;
    tags?: string[];
    userId: string;
}) => {
    const { id, userId, taskName, description, isDone, priority, tags } = args;

    if (!userId) {
        return { success: false, message: "need userId" };
    }

    const user = await UserModel.findById(userId);
    if (!user) {
        return {
            success: false,
            data: null,
            message: "❌ user doesnt exist."
        };
    }

    const task = await TaskModel.findById(id);
    if (!task) {
        return {
            success: false,
            data: null,
            message: "❌ taks not found."
        };
    }

    if (String(task.userId) !== String(userId)) {
        return {
            success: false,
            data: null,
            message: "not your task yahdanbe"
        };
    }

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, {
            ...(taskName && { taskName }),
            ...(description && { description }),
            ...(isDone !== undefined && { isDone }),
            ...(priority !== undefined && { priority }),
            ...(tags && { tags }),
        }, { new: true });

        return {
            success: true,
            data: updatedTask,
            message: "ok ✅ updated"
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "failed to update ❗️",
            data: null
        };
    }
};