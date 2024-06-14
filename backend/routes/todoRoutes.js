const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.get("/todolar", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error("Error when fetching:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = await Todo.create({ title, description });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error while creating:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not faund" });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.completed = completed !== undefined ? completed : todo.completed;

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error("Error patching todo:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.destroy();

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
