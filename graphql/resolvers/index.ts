import { createTask } from "./mutations/create-task-mutation";
import { sayHello } from "./mutations/say-hello";
import { updateTask } from "./mutations/update-task-mutation";
import { getAllFinishedTasks } from "./queries/getAll-finished-tasks-query";
import { getAllTasks } from "./queries/getAllTask-query";
import { helloQuery } from "./queries/hello-query";

export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getAllFinishedTasks,
  },
  Mutation: {
    sayHello,
    createTask,
    updateTask,
  },
};
