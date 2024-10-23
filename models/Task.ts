import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  taskName: string;
  isDone: boolean;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
  taskName: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  priority: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export { Task };
