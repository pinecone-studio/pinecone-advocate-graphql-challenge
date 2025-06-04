import mongoose, { Schema } from "mongoose";

type TaskType = {
    taskName: string;
    description: string;
    isDone: boolean;
    priority: number;
    tags: string[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}


const TaskSchema = new Schema<TaskType>({
    //auto id
    taskName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        validate: {
            validator: function (description: string) {
                return description !== this.taskName;
            },
            message: "description must not be the same as task name",
        }
    },
    isDone: { type: Boolean, default: false },
    priority: {
        type: Number,
        required: true,
        min: [1, "priority must be at least 1"],
        max: [5, "priority must be at most 5"],
    },
    tags: {
        type: [String],
        default: [],
        required: false,
        validate: {
            validator: function (value: string[]) {
                return value.length <= 3;
            },
            message: "You can choose max 3 tags ",
        },
    },
    userId: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true,
    });

const TaskModel = mongoose.models.Task || mongoose.model("Task", TaskSchema)
export default TaskModel

// mongoose.models.Task = model already exists (re-definition error-s sergiileh)
// mongoose.model("Task", TaskSchema) = "Task" nertei NEW model uusgeh (if not already created )


