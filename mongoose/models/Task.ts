import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, "Task name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      required: [true, "Priority is required"],
      min: [1, "Priority must be at least 1"],
      max: [5, "Priority cannot exceed 5"],
    },
    tags: {
      type: [String],
      default: [],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const TaskModel =
  mongoose.models.Task || mongoose.model("Task", taskSchema);
