import { addTask } from "./mutations/addTask";
import { updateTask } from "./mutations/updateTask";
import { getAllTasks } from "./queries/getAllTasks";
import { getDoneTasksLists } from "./queries/getDoneTasksLists";

export const resolvers = {
  Query: {
    getAllTasks,
    getDoneTasksLists,
  },
  Mutation: {
    addTask,
    updateTask,
  },
};
