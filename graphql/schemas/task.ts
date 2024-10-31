import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  taskName: string;
  isDone: boolean;
  priority: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema: Schema = new Schema(
  {
    taskName: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    priority: { type: Number, required: true },
  },
  {
    timestamps: true, 
  }
);

export const Task = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
