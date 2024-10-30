import { addTask } from './mutations/add-task-todo';
import { updateTask } from './mutations/update-task-todo';
import { getAllTasks } from './queries/get-all-task';
import { getDoneTasks } from './queries/get-done-status-task';

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
