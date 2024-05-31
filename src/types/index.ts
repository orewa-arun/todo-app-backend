import {Document} from "mongoose";

// Interface defines the structure of an entity, ex : objects
// Can even include function defintions
export interface ITodo extends Document{
    name : string,
    description : string,
    status : boolean
}