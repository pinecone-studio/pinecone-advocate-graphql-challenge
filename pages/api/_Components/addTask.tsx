"use client";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

type Props = {
  refetch: () => void;
};

export const AddTask = ({ refetch }: Props) => {
  const [addTodo] = useMutation(ADD_TODO);

  const [input, setInput] = useState("");

  const handleAdd = async () => {
    if (!input.trim()) return;
    await addTodo({ variables: { title: input } });
    setInput("");
    refetch();
  };
  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo..."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleAdd}
        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow"
      >
        Add
      </button>
    </div>
  );
};
