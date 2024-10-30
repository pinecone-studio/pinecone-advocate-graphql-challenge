import { AddTodo } from "./mutations/add-todo";
import { sayHello } from "./mutations/say-hello";
import { helloQuery } from "./queries/hello-query";

export const resolvers = {
  Query: {
    helloQuery,
  },
  Mutation: {
    sayHello,
    AddTodo
  },
};
