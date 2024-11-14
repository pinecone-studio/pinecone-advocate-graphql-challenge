import { getAllTasks } from "./queries/getAllTasks";
import { getFinishedTasksLists } from "./queries/getFinishidTasksLists";
import { addTask } from "./mutations/add-task";
import { updateTask } from "./mutations/update-task";
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
