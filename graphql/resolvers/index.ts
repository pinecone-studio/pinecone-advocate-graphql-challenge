import { sayHello } from "./mutations/say-hello";
import { todoAdd } from "./mutations/todo-add";
import { todoUpdate } from "./mutations/todo-update";
import { getAllTasks } from "./queries/get-all-tasks";
import { getDoneTasks } from "./queries/get-done-tasks";
import { helloQuery } from "./queries/hello-query";
import { GraphQLScalarType, Kind } from "graphql";
import { search } from "./queries/search";
import { getTaskByPriority } from "./queries/get-tasks-by-priority";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});
export const resolvers = {
  Date: dateScalar,
  Query: {
    helloQuery,
    getDoneTasks,
    getAllTasks,
    search,
    getTaskByPriority,
  },
  Mutation: {
    sayHello,
    todoAdd,
    todoUpdate,
  },
};
