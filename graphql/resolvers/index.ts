import { addTask } from "./mutations/add-task";
import { deleteTask } from "./mutations/delete-task";
import { sayHello } from "./mutations/say-hello";
import { updateTask } from "./mutations/update-task";
import { getAllTasks, getUserDoneTasksLists, helloQuery } from "./queries";

export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getUserDoneTasksLists,
  },
  Mutation: {
    sayHello,
    addTask,
    updateTask,
    deleteTask,
  },
};
