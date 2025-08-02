import { model, models, Schema } from 'mongoose';

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    priority: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const taskModel = models.taskModel || model('taskModel', taskSchema);
