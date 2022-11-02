const express = require("express");
const pool = require("../database/db");

const router = express.Router();

// Create a todo
router.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all todo
router.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a todo
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.status(200).json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );

    res.status(200).json(updatedTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
