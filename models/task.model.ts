import { model, Schema, Document } from "mongoose";

// Define the TypeScript interface for the Task document
interface ITask extends Document {
  taskName: string;
  isDone: boolean;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
  taskName: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(), // Using a function to set the default value
    required: true,
  },
  updatedAt: {
    type: Date,
    default: new Date(), // Using a function to set the default value
    required: true,
  },
});

// Compile the model with the ITask interface
const Task = model<ITask>("Task", taskSchema);
export default Task;
