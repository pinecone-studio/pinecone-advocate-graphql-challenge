import mongoose from "mongoose";
export const todoSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minlength: [10, "Хамгийн багадаа 10 урттай тайлбар оруулна уу"],
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    required: true,
    min: [1, "Чухал байдлыг 1 ээс 5 ийн хооронд оруулна уу"],
    max: [5, "Чухал байдлыг 1 ээс 5 ийн хооронд оруулна уу"],
  },
  tags: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});
const TodoModel = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default TodoModel;

//addTask:

// taskName (String) => required
// description (String) => required ( must be at least 10 characters long )
// isDone (Boolean) => default to false
// priority (Int) => required (values 1-5)
// tags (Array of Strings) => optional, allows categorization
// createdAt (Date)
// updatedAt (Date)
// _id (MongoDB Object Id)

// updateTask:

// taskName (String)
// description (String)
// priority (Int) => validate within range 1-5
// isDone (Boolean)
// tags (Array of Strings) => append or remove tags
