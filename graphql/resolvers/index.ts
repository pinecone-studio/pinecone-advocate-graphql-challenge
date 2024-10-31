import { sayHello } from "./mutations/say-hello";
import { helloQuery } from "./queries/hello-query";
import { addTask } from "./mutations/addtask";
import { getAllTasks } from "./queries/getalltask";
import { getDoneTasks } from "./queries/getdonetask";
import { updateTask } from "./mutations/updatetask";
export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getDoneTasks
  },
  Mutation: {
    sayHello,
    addTask,
    updateTask
  },
};
