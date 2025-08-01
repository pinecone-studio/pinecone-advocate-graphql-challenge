import { addTaskInput } from "./mutations/add-tasks";
import { updateTaskInput } from "./mutations/update-tasks";
import { getAllTasks } from "./queries/get-all-tasks";
import { getFinishedTasksLists } from "./queries/get-finished-tasks-lists";

export const resolvers = {
  Query: {
    getAllTasks,
    getFinishedTasksLists,
  },
  Mutation: {
    addTaskInput,
    updateTaskInput,
  },
};
