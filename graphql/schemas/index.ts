import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum StatusType {
    Todo
    InProgress
    Done
  }
  
  type Todo {
   id: ID!
   status: StatusType!
   title: String
  }

  input TodoAddInput {
    status: StatusType!
    title: String
  }

  type Query {
    helloQuery: String
  }

  type Mutation {
    sayHello(name: String!): String
    AddTodo(todo: TodoAddInput): Todo
  }
`;
