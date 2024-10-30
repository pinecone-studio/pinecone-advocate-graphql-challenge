import { Schema, model } from "mongoose";
import { title } from "process";

const todoSchema = new Schema({
    title:{
        type:String,
        required: [true, "todo title required"]
    },
    status:{
        type:String,
        enum:['Todo','InProgress','Done'],
        required: [true, "todo status is required"]
    }
});

export const TodoModel = model("todos", todoSchema)