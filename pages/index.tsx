import { AddTodoForm } from "@/components/AddTodoForm";
import { TodoCard } from "@/components/Todo";
import {} from "@/lib/graphql/mutations/todo";
import { getAllTasksQuery } from "@/lib/graphql/queries/todo";
import { TTodo } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function test() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: getAllTasksQuery,
        }),
      });
      const { data } = await res.json();
      setTodos(data.getAllTasks);
    }
    test();
  }, []);
  return (
    <div className="container ">
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Todo app{" "}
      </h2>
      <div
        style={{
          display: "flex",
        }}
      >
        <label htmlFor="search">
          <input
            type="text"
            id="search"
            placeholder="Search a todo"
            className="search"
          />
        </label>
        <button>Search</button>
      </div>
      <AddTodoForm />
      <div className="flex flex-col">
        {todos.length > 0
          ? todos.map((todo: TTodo) => <TodoCard key={todo._id} todo={todo} />)
          : null}
      </div>
    </div>
  );
}
