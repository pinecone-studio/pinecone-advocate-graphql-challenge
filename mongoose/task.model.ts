import { Schema, model, models, Model } from "mongoose";

type TaskType = {
  taskName: string;
  description: string;
  isDone: boolean;
  priority: number;
  tags?: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

const TaskSchema = new Schema<TaskType>(
  {
    taskName: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, minlength: 10 },
    isDone: { type: Boolean, default: false },
    priority: { type: Number, required: true, min: 1, max: 5 },
    tags: { type: [String], required: false, maxlength: 5 },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const TaskModel: Model<TaskType> = models["Task"] || model("Task", TaskSchema);
