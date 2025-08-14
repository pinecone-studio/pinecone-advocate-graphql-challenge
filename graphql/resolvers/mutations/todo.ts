import { TodoModel } from "@/graphql/schemas";
import { v4 as uuidv4 } from "uuid"; // to generate unique IDs

export const addTodo = async (_: any, { title }: { title: string }) => {
  try {
    const newTodo = await TodoModel.create({
      id: uuidv4(),
      title,
      completed: false,
    });
    return newTodo;
  } catch (error) {
    throw new Error("Failed to add todo");
  }
};

export const deleteTodo = async (
  _: any,
  { id, title, completed }: { id: string; title?: string; completed?: boolean }
) => {
  try {
    const deleteTodo = await TodoModel.findOneAndUpdate(
      { id },
      {
        $set: {
          ...(title && { title }),
          ...(completed !== undefined && { completed }),
        },
      },
      { new: true }
    );
    if (!deleteTodo) throw new Error("Todo not found");
    return deleteTodo;
  } catch (error) {
    throw new Error("Failed to update todo");
  }
};

// export const deleteTodo = async (_: any, { id }: { id: string }) => {
//   try {
//     const deleted = await TodoModel.findOneAndDelete({ id });
//     return !!deleted;
//   } catch (error) {
//     throw new Error("Failed to delete todo");
//   }
// };

export const updateTask = async (_: any, { id, title, completed }: any) => {
  const updated = await TodoModel.findOneAndUpdate(
    { id },
    {
      $set: {
        ...(title && { title }),
        ...(completed !== undefined && { completed }),
      },
    },
    { new: true }
  );
  if (!updated) throw new Error("Task not found");
  return updated;
};
