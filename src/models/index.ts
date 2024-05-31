import { Schema, model } from "mongoose";
import { ITodo } from "../types";

const TodoSchema : Schema = new Schema(
    {
        name : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        status : {
            type : Boolean,
            required : true
        }
    },
    {
        timestamps : true
    }
);

export default model<ITodo>("TODO", TodoSchema);