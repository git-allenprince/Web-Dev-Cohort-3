const express = require("express");

const app = express();

let todos = [];
app.use(express.json());

app.post("/", function (req, res) {
  const { title } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.get("/", function (req, res) {
  res.send("hello");

  res.json(todos);
});

app.delete("/:id", function (req, res) {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "To Do not found" });
  const deleted = todos.splice(index, 1);
  console.log("To do deleted:", deleted[0]);
  res.json({ message: "Todo deleted", todo: deleted[0] });
});

app.post("/:id", function (req, res) {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  console.log("Todo updated:", todo);
  res.json(todo);
});
app.listen(3000);
