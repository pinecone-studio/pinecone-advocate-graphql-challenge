import { TodoModel } from "@/graphql/schemas";

export const getTodo = async () => {
  try {
    const todos = await TodoModel.find();
    console.log(todos);
    return todos;
  } catch (error) {
    throw new Error("Failed to fetch todos");
  }
};

export const getFinishedTodos = async () => {
  try {
    const todos = await TodoModel.find({ completed: true });
    return todos;
  } catch (error) {
    throw new Error("Failed to fetch finished todos");
  }
};

// export const updateTodo = async (
//   _: any,
//   { id, title, completed }: { id: string; title?: string; completed?: boolean }
// ) => {
//   try {
//     const updatedTodo = await TodoModel.findOneAndUpdate(
//       { id },
//       {
//         $set: {
//           ...(title && { title }),
//           ...(completed !== undefined && { completed }),
//         },
//       },
//       { new: true }
//     );
//     if (!updatedTodo) throw new Error("Todo not found");
//     return updatedTodo;
//   } catch (error) {
//     throw new Error("Failed to update todo");
//   }
// };
