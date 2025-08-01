import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  userId: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
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

taskSchema.index({ taskName: 1, userId: 1 }, { unique: true });
export const TaskModel = models.TaskModel || model("TaskModel", taskSchema);
