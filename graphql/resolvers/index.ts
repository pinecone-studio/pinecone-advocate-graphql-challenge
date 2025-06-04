import { addTask } from "./mutations/addTask";
import { addUser } from "./mutations/addUser";
import { updateTasks } from "./mutations/updateTask";
import { getAllTasks } from "./queries/getActiveTasks";
import { getFinishedTasks } from "./queries/getFinishedTasks";

export const resolvers = {
    Query: {
        getAllTasks,
        getFinishedTasks,
    },
    Mutation: {
        addTask,
        updateTask: updateTasks,
        addUser
    },
};