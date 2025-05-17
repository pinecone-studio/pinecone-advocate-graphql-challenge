// Import existing resolvers
import { sayHello } from "./mutations/say-hello";
import { helloQuery } from "./queries/hello-query";
import { updateTask } from "./mutations/update-task";
import { getAllTasks } from "./queries/get-all-task";
import { getFinishedTasks } from "./queries/get-finished-task";
import addTask from "./mutations/add-task";
export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getFinishedTasks,
  },
  Mutation: {
    sayHello,
    addTask,
    updateTask,
  },
};
