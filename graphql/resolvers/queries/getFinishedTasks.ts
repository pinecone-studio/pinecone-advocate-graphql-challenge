import TaskModel from "@/mongoose/ModelTask";
import UserModel from "@/mongoose/ModelUser";

export const getFinishedTasks = async (_: any, args: { userId: string }) => {
    const { userId } = args;

    const userExists = await UserModel.findById(userId);
    if (!userExists) {
        return {
            success: false,
            message: "user not found"
        }
    }
    try {
        const doneTasks = await TaskModel.find({
            userId,
            isDone: true,
        });

        return {
            success: true,
            message: "successfully get all finished tasks",
            data: doneTasks
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            message: " error srry"
        }
    }

};