import { model, models, Schema } from "mongoose";
type Task = {
  _id: Schema.Types.ObjectId;
  taskName: string;
  isDone: Boolean;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
};

const taskSchema = new Schema<Task>(
  {
    taskName: {
      type: String,
      required: [true, "Ажлын нэрийг оруулах"],
    },
    isDone: {
      type: Boolean,
      required: [true, "Ажлын нэрийг оруулах"],
      default: false,
    },
    priority: {
      type: Number,
      required: [true, "Ажлын нэрийг оруулах"],
    },
  },
  { timestamps: true }
);
const TaskModel = models.TaskModel || model("TaskModel", taskSchema);

// const TaskModel = model("TaskModel", taskSchema);
export default TaskModel;
