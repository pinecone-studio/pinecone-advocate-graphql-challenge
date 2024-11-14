import { addTask } from "./mutations/add-task";
import { updateTask } from "./mutations/update-task";
import { getAllTasks } from "./queries/get-all-tasks";
import { getDoneTasks } from "./queries/get-done-tasks";

export const resolvers = {
  Query: {
    getAllTasks,
    getDoneTasks,
  },
  Mutation: {
    addTask,
    updateTask,
  },
};
