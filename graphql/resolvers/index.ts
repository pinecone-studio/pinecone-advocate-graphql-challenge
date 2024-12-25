import { addTask } from "./mutations/add-task";
import { sayHello } from "./mutations/say-hello";
import { updateTask } from "./mutations/update-task";
import { getAllTasks } from "./queries/get-all-tasks";
import { getDoneTasksLists } from "./queries/get-done-tasks-lists";
import { helloQuery } from "./queries/hello-query";
import { searchTasks } from "./queries/search-tasks";

export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getDoneTasksLists,
    searchTasks,
  },
  Mutation: {
    // sayHello,
    addTask,
    updateTask,
  },
};
