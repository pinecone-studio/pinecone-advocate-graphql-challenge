import { addTask } from "./mutations/add-task";
import { updateTask } from "./mutations/update-task";
import { getAllTasks } from "./queries/get-AllTasks";
import { getFinishedTasksLists } from "./queries/getFinishidTasksLists";

export const resolvers = {
  Query: {
    getAllTasks,
    getFinishedTasksLists,
  },
  Mutation: {
    addTask,
    updateTask,
  },
};
