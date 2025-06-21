import { gql } from "apollo-server";

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $description: String
    $completed: Boolean
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      completed: $completed
    ) {
      id
      title
      description
      completed
    }
  }
`;
