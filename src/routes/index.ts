import { Router } from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers";

const router : Router = Router();

router.get("/todos", getTodos);
router.post("/add-todo", addTodo);
router.put("/update-todo", updateTodo);
router.delete("/delete-todo", deleteTodo);

export default router;