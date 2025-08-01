import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDone: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: true,
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

taskSchema.index({ userId: 1, taskName: 1 }, { unique: true });

export const TaskModel = models.TaskModel || model("TaskModel", taskSchema);
