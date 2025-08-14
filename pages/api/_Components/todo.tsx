import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { AddTask } from "./addTask";
import { UpdateDialog } from "./updateDialog";

const GET_TODOS = gql`
  query {
    getTodo {
      id
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!, $title: String, $completed: Boolean) {
    deleteTodo(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String, $completed: Boolean) {
    updateTask(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
interface GetTodosData {
  getTodo: Todo[];
}

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export function TodoList() {
  const { data, loading, error, refetch } = useQuery<GetTodosData>(GET_TODOS);

  const [editText, setEditText] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const handleStartEdit = (todo: Todo) => {
    setEditText({ id: todo.id, title: todo.title });
  };

  const handleUpdateTask = async () => {
    if (!editText || !editText.title.trim()) return;

    await updateTask({
      variables: { id: editText.id, title: editText.title },
    });

    setEditText(null);
    refetch();
  };

  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTask] = useMutation(UPDATE_TASK);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading todos</p>;

  const handleComplete = async (id: string, currentStatus: boolean) => {
    await deleteTodo({
      variables: { id, completed: !currentStatus },
    });
    refetch();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Todo List
      </h2>

      {/* Add todo input */}
      <AddTask refetch={refetch} />
      {/* Update Dialog */}
      <UpdateDialog
        handleUpdateTask={handleUpdateTask}
        editText={editText}
        setEditText={setEditText}
      />
      {/* Active Tasks */}
      <h2 className="text-2xl font-semibold mb-3 text-gray-700">
        Active Tasks
      </h2>
      <ul className="space-y-2">
        {data?.getTodo
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 rounded-lg p-3 shadow-sm"
            >
              <span className="text-gray-800">{todo.title}</span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => handleStartEdit(todo)}
                >
                  Update
                </button>
                <button
                  onClick={() => handleComplete(todo.id, todo.completed)}
                  className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>

      {/* Finished Tasks */}
      <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-700">
        Finished Tasks
      </h2>
      <ul className="space-y-2">
        {data?.getTodo
          .filter((todo) => todo.completed)
          .map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-green-100 rounded-lg p-3 shadow-sm"
            >
              <span className="line-through text-gray-500">{todo.title}</span>
              <button
                onClick={() => handleComplete(todo.id, todo.completed)}
                className="px-3 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Undo
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
