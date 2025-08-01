import { addTask } from "./mutations/addTask";
import { sayHello } from "./mutations/say-hello";
import { updateTask } from "./mutations/updateTask";
import { getTask } from "./queries/getTask";
import { getUserDoneTasksLists } from "./queries/getUserDoneTaskLists";
import { helloQuery } from "./queries/hello-query";

export const resolvers = {
  Query: {
    helloQuery,
    getTask,
    getUserDoneTasksLists,
  },
  Mutation: {
    sayHello,
    addTask,
    updateTask,
  },
};
