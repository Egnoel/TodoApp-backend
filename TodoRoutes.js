import express from "express";
import {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  deleteCompleted,
} from "./TodoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.delete("/completed", deleteCompleted);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
