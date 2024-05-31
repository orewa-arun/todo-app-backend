import {Request, Response} from "express";

// Interface of the Todo document
import { ITodo } from "../types";

// Todo model representing todos collection
import Todo from "../models";

// Get all todos
const getTodos = async (req : Request, res : Response) : Promise<void> => {
    try {
        const allTodos : ITodo[] = await Todo.find();
        res.status(200).json({
            message : "All todos",
            todos : allTodos
        });
    } catch (error) {
        console.log("ERROR occured : ", error);
    }
}

// Add a todo
const addTodo = async (req : Request, res : Response) : Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "description">;

        // creating a new document using Todo model
        const todo : ITodo = new Todo({
            name : body.name,
            description : body.description,
            status : false
        });

        const newTodo : ITodo = await todo.save();
        const allTodos : ITodo[] = await Todo.find();

        res.status(201).json({
            message : "New Todo Created",
            todo : newTodo,
            todos : allTodos
        });
    } catch (error) {
        console.log("ERROR occured : ", error);
    }
}

// Update a Todo, i.e if a task is done 
const updateTodo = async (req : Request, res : Response) : Promise<void> => {
    try {
        const id = req.params.id;
        const body = req.body;
    
        const updatedTodo : ITodo | null = await Todo.findByIdAndUpdate(
            { _id : id},
            body
        )

        const allTodos : ITodo[] = await Todo.find();

        res.status(200).json({
            message : "Todo updated",
            todo : updatedTodo,
            todos : allTodos
        });
    } catch (error) {
        console.log("ERROR occured : ", error);
    }
}

// Delete a Todo
const deleteTodo = async (req : Request, res : Response) : Promise<void> => {
    try {
        const id = req.params.id;

        const deletedTodo : ITodo | null = await Todo.findByIdAndDelete(
            {_id : id}
        );

        const todos : ITodo[] = await Todo.find();

        res.status(200).json({
            message : "Todo deleted",
            todo : deletedTodo,
            todos: todos
        });
    } catch (error) {
        console.log("ERROR occured : ", error);
    }
}