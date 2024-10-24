import { addTask, sayHello, updateTask } from "./mutations";
import { getAllTasks, getDoneTasksLists, helloQuery } from "./queries";

export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getDoneTasksLists,
  },
  Mutation: {
    sayHello,
    addTask,
    updateTask,
  },
};
