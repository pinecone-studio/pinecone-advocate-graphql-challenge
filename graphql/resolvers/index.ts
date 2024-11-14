import { AddTask } from "./mutations/add-task";
import { sayHello } from "./mutations/say-hello";
import { updateTask } from "./mutations/update-task";
import { getAllTasks } from "./queries/getAlltasks";
import { getDoneTasks } from "./queries/getDoneTasks";
import { helloQuery } from "./queries/hello-query";
import { hiQuery } from "./queries/hi-query";

export const resolvers = {
  Query: {
    getAllTasks,
    getDoneTasks,
    helloQuery,
    hiQuery,
  },
  Mutation: {
    sayHello,
    AddTask,
    updateTask,
  },
};
