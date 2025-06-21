import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  createdAt: Date;
  completed: boolean;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

const TaskModel =
  mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default TaskModel;
