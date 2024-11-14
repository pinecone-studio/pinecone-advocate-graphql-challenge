import { model, Schema } from "mongoose";

// interface ITask {
//   _id: Schema.Types.ObjectId;
//   taskName: string;

//   isDone: boolean;
//   priority: number;

//   created_at: string;
//   updated_at: string;
// }

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
  priority: {
    type: Number,
    required: true,
  },

  created_at: {
    type: String,
    required: true,
    default: Date.now,
  },

  updated_at: {
    type: String,
    required: true,
    default: Date.now,
  },
});

const Task = model("Task", taskSchema);
export default Task;
