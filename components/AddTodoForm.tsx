import { todoAddMutation } from "@/lib/graphql/mutations/todo";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const AddTodoForm = ({
  setTodoAdded,
}: {
  setTodoAdded: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const taskName = formData.get("taskName");
    const description = formData.get("description");
    const priority = Number(formData.get("priority"));
    if (Number(priority) <= 0) {
      alert("Priority should be greater than 0");
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: todoAddMutation,
        variables: {
          input: {
            taskName,
            description,
            priority,
          },
        },
      }),
    });
    if (res.ok) {
      alert("You have successfully added a task.");
      setTodoAdded((pre) => !pre);
    }
  };
  return (
    <form
      action=""
      style={{
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
      }}
      onSubmit={handleSubmit}
    >
      <h2>Add task</h2>
      <label htmlFor="taskName">
        <input
          type="text"
          placeholder="Task name"
          id="taskName"
          name="taskName"
          className="inputStyle"
          required
        />
      </label>
      <label htmlFor="description">
        <input
          type="text"
          placeholder="description"
          id="description"
          name="description"
          className="inputStyle"
          required
        />
      </label>
      <label htmlFor="priority">
        <input
          type="number"
          placeholder="priority"
          id="priority"
          name="priority"
          className="inputStyle"
          required
        />
      </label>
      <button type="submit">Add task</button>
    </form>
  );
};
