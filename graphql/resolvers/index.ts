import { addTask, sayHello, updateTask } from "./mutations";
import { getAllTasks, getDoneTasks, helloQuery } from "./queries";

export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getDoneTasks,
  },
  Mutation: {
    sayHello,
    addTask,
    updateTask,
  },
};
