import { createTask } from './mutations/createTask';
import { updateTask } from './mutations/updateTask';
import { getUserDoneTasksLists } from './queries/getUserDoneTasksLists';

export const resolvers = {
  Query: {
    getUserDoneTasksLists,
  },
  Mutation: {
    createTask,
    updateTask,
  },
};
