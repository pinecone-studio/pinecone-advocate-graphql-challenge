import { sayHello } from "./mutations/say-hello";
import { helloQuery } from "./queries/hello-query";
import { addTask } from "./mutations/addTask";
import { updateTask } from "./mutations/updateTask";
import { getAllTasks } from "./queries/getAllTasks";
import { getFinishedTasksLists } from "./queries/getFinishedTasksLists";

export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getFinishedTasksLists,
  },
  Mutation: {
    sayHello,
    addTask,
    updateTask,
  },
};
