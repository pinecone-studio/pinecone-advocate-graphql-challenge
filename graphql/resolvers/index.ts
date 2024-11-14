import { addTask } from "./mutations/addTask";
import { updateTask } from "./mutations/updateTask";
import { getAllTasks } from "./queries/getAllTasks";
import { getDoneTasksLists } from "./queries/getDoneTasksLists";
import { helloQuery } from "./queries/hello-query";

export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getDoneTasksLists,
  },
  Mutation: {
    addTask,
    updateTask,
  },
};
