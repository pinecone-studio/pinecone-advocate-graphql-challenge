import { addTask } from "./mutations/add-task";
import { sayHello } from "./mutations/say-hello";
import { updateTask } from "./mutations/update-task";
import { getAllTasks } from "./queries/get-all";
import { getDoneTasksLists } from "./queries/get-done";
import { searchTasks } from "./queries/get-search";
import { helloQuery } from "./queries/hello-query";

export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getDoneTasksLists,
    searchTasks,
  },
  Mutation: {
    sayHello,
    addTask,
    updateTask,
  },
};
