import { model, Schema, models } from "mongoose";

const schema = new Schema(
  {
    taskName: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    priority: { type: Number, required: true },
  },
  { timestamps: true }
);

export const TaskModel = models.Task || model("Task", schema);
