# 📝 To-Do CRUD API – Backend Assignment

## 📌 Objective
Build a simple REST API for managing **to-do items**.  
The backend must support full CRUD operations, use **Express.js**, and store data either in memory or in a **local JSON file**.

This implementation includes all mandatory requirements **plus bonus features**.

---

# 🚀 Features

### ✅ Core Requirements
- **GET /todos** → Return all todos  
- **POST /todos** → Create a new todo  
- **PUT /todos/:id** → Update an existing todo  
- **DELETE /todos/:id** → Delete a todo  
- **Local JSON file storage** (no database required)  

### 🎁 Bonus Features (Included)
- Input validation for title and completed fields  
- `completed: true/false` boolean flag  
- Clean JSON responses  
- Helpful error messages with proper HTTP status codes  
- Persistent storage using `todos.json`  
- CORS enabled (for frontend consumption)  
- Ready for deployment to Render / Railway / Cyclic  

---

# 📁 Folder Structure

```
backend/
└── todo-api/
    ├── package.json
    ├── server.js
    ├── todos.json
    └── README.md
```

---

# 🛠 Setup & Installation

### 1️⃣ Navigate to project folder
```bash
cd backend/todo-api
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the server
```bash
node server.js
```

Server runs at:
```
http://localhost:5000
```

---

# 📡 API Endpoints

## ▶️ **GET /todos**
Returns list of all todos.

### Response:
```json
{
  "success": true,
  "todos": [
    {
      "id": 1711056791333,
      "title": "Buy milk",
      "completed": false
    }
  ]
}
```

---

## ➕ **POST /todos**
Create a new todo.

### Request Body:
```json
{
  "title": "Buy groceries",
  "completed": false
}
```

### Response:
```json
{
  "success": true,
  "todo": {
    "id": 1711056791400,
    "title": "Buy groceries",
    "completed": false
  }
}
```

---

## ✏️ **PUT /todos/:id**
Update an existing todo.

### Example:
```
PUT /todos/1711056791400
```

### Request Body (any field is optional):
```json
{
  "title": "Buy bread",
  "completed": true
}
```

### Response:
```json
{
  "success": true,
  "todo": {
    "id": 1711056791400,
    "title": "Buy bread",
    "completed": true
  }
}
```

---

## ❌ **DELETE /todos/:id**
Delete a todo by ID.

### Response:
```json
{
  "success": true,
  "message": "Todo deleted"
}
```

---

# 🗂 Data Storage – `todos.json`

This file stores all todos:

```json
[
  {
    "id": 1711056791333,
    "title": "Buy groceries",
    "completed": false
  }
]
```

The file updates automatically whenever you create/update/delete a todo.

---

# 💻 Code – `server.js`

```javascript
import express from "express";
import cors from "cors";
import fs from "fs-extra";

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./todos.json";

// Ensure todos.json exists
if (!fs.existsSync(FILE)) {
    fs.writeJsonSync(FILE, []);
}

// Helper functions
const readTodos = () => fs.readJsonSync(FILE);
const writeTodos = (data) => fs.writeJsonSync(FILE, data, { spaces: 2 });

// GET /todos
app.get("/todos", (req, res) => {
    const todos = readTodos();
    res.json({ success: true, todos });
});

// POST /todos
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

// PUT /todos/:id
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

// DELETE /todos/:id
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
```

---

# 🌐 Deployment Guide (Optional Bonus)

### Deploy to Render:
1. Push project to GitHub  
2. Go to https://render.com  
3. Create → Web Service  
4. Select your repo  
5. Set:
   - Environment = Node  
   - Start Command = `node server.js`  
6. Deploy  

### Deploy to Railway:
1. Go to https://railway.app  
2. New Project → Deploy from Repo  
3. Add your GitHub repo  
4. Railway auto-detects Node.js  
5. Deploy  

---

# ✔ Final Notes
- Zero external database required  
- Clean input validation prevents crashes  
- Fully compatible with frontend projects via CORS  
- Perfect for assignment submission  

---

# 📜 License
Free to use for educational and assignment purposes.