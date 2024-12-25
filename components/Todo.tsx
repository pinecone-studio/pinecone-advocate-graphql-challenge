import { TTodo } from "@/lib/types";

export const TodoCard = ({ todo }: { todo: TTodo }) => {
  const createdAt = new Date(todo.createdAt).toLocaleDateString();
  const updatedAt = new Date(todo.updatedAt).toLocaleDateString();
  return (
    <div className="todoCard">
      <input type="checkbox" />
      <div className="flex flex-col">
        <p
          style={{
            fontWeight: "bold",
          }}
        >
          {todo.taskName}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          {todo.description}
        </p>
      </div>
      <div className="flex flex-col">
        <div className="timeShower">
          <p
            style={{
              fontSize: "14px",
              color: "#6B7280",
            }}
          >
            Created at:
          </p>
          <p
            style={{
              fontWeight: "500",
            }}
          >
            {createdAt}
          </p>
        </div>
        <div className="timeShower">
          <p
            style={{
              fontSize: "14px",
              color: "#6B7280",
            }}
          >
            Updated at:
          </p>
          <p
            style={{
              fontWeight: "500",
            }}
          >
            {updatedAt}
          </p>
        </div>
      </div>
    </div>
  );
};
