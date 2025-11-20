import express from "express";
import cors from "cors";
import fs from "fs-extra";

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./todos.json";

// Ensure file exists
if (!fs.existsSync(FILE)) {
    fs.writeJsonSync(FILE, []);
}

// Helper to read/write file
const readTodos = () => fs.readJsonSync(FILE);
const writeTodos = (data) => fs.writeJsonSync(FILE, data, { spaces: 2 });


// -----------------------------
// GET /todos
// -----------------------------
app.get("/todos", (req, res) => {
    const todos = readTodos();
    res.json({ success: true, todos });
});


// -----------------------------
// POST /todos
// -----------------------------
app.post("/todos", (req, res) => {
    const { title, completed = false } = req.body;

    if (!title || typeof title !== "string") {
        return res.status(400).json({ success: false, message: "Invalid title" });
    }
    if (typeof completed !== "boolean") {
        return res.status(400).json({ success: false, message: "Invalid completed field" });
    }

    const todos = readTodos();

    const newTodo = {
        id: Date.now(),
        title,
        completed
    };

    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json({ success: true, todo: newTodo });
});


// -----------------------------
// PUT /todos/:id
// -----------------------------
app.put("/todos/:id", (req, res) => {
    const todos = readTodos();
    const id = Number(req.params.id);

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ success: false, message: "Todo not found" });
    }

    const { title, completed } = req.body;

    if (title !== undefined && typeof title !== "string") {
        return res.status(400).json({ success: false, message: "Invalid title" });
    }
    if (completed !== undefined && typeof completed !== "boolean") {
        return res.status(400).json({ success: false, message: "Invalid completed field" });
    }

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    writeTodos(todos);

    res.json({ success: true, todo });
});


// -----------------------------
// DELETE /todos/:id
// -----------------------------
app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const todos = readTodos();

    const newList = todos.filter(t => t.id !== id);

    if (newList.length === todos.length) {
        return res.status(404).json({ success: false, message: "Todo not found" });
    }

    writeTodos(newList);
    res.json({ success: true, message: "Todo deleted" });
});


// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
