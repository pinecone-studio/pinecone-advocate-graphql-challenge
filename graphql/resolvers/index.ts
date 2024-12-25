import { Task } from "../schemas";

export type Task = {
  _id: string;
  taskName: string;
  description: string;
  isDone: boolean;
  priority: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const resolvers = {
  Query: {
    getDoneTasksLists: async () => await Task.find({ isDone: true }),
    searchTasks: async (
      _: any,
      { searchTerm, priority, isDone, createdBefore, createdAfter }: any
    ) => {
      const query: any = {};
      if (searchTerm) query.taskName = { $regex: searchTerm, $options: "i" };
      if (priority) query.priority = priority;
      if (isDone !== undefined) query.isDone = isDone;
      if (createdBefore) query.createdAt = { $lt: new Date(createdBefore) };
      if (createdAfter) query.createdAt = { $gt: new Date(createdAfter) };
      return await Task.find(query);
    },
    getAllTasks: async () => await Task.find(),
  },
  Mutation: {
    addTask: async (
      _: any,
      {
        taskName,
        description,
        isDone = false,
        priority,
        tags = [],
        createdAt = new Date(),
        updatedAt = new Date(),
      }: any
    ) => {
      if (description.length < 10)
        throw new Error("Description must be at least 10 characters long");
      if (priority < 1 || priority > 5)
        throw new Error("Priority must be between 1 and 5");

      const newTask = await Task.create({
        taskName,
        description,
        isDone,
        priority,
        tags,
        createdAt,
        updatedAt,
      });

      return newTask;
    },
    updateTask: async (
      _: any,
      { taskId, taskName, description, priority, isDone, tags }: any
    ) => {
      if (description && description.length < 10)
        throw new Error("Description must be at least 10 characters long");
      if (priority && (priority < 1 || priority > 5))
        throw new Error("Priority must be between 1 and 5");

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        {
          ...(taskName && { taskName }),
          ...(description && { description }),
          ...(priority && { priority }),
          ...(isDone !== undefined && { isDone }),
          ...(tags && { tags }),
          updatedAt: new Date(),
        },
        { new: true }
      );

      if (!updatedTask) throw new Error("Task not found");

      return updatedTask;
    },
  },
};
