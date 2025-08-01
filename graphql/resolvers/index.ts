import { addTask } from "./mutations/addtask";
import { updateTask } from "./mutations/updateTask";
import { getAllTasks } from "./query/getalltask";
import { getUserDoneTasksLists } from "./query/getsuerDonetask";

export const resolvers = {
  Query: {
    getAllTasks,
    getUserDoneTasksLists,
  },
  Mutation: {
    addTask,
    updateTask,
  },
};
