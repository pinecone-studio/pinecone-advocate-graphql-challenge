import mongoose from "mongoose";

type Tasks = {
  title: string;
  description?: string;
  isCompleted: boolean;
  isFinished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const taskSchema = new mongoose.Schema<Tasks>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.models.Task || mongoose.model<Tasks>("Task", taskSchema);

export default Task;
