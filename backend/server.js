const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./test.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to SQLite database");
});

const sql_create = `CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  isCompleted BOOLEAN NOT NULL
);`;

db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Successful creation of the "todos" table');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/todos", (req, res) => {
  const sql = "SELECT * FROM todos";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

app.post("/todos", (req, res) => {
  const { name, isCompleted } = req.body;

  const sql = "INSERT INTO todos (name, isCompleted) VALUES (?, ?)";
  db.run(sql, [name, isCompleted], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ id: this.lastID, name, isCompleted });
  });
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { name, isCompleted } = req.body;
  const editedIsCompleted = isCompleted ? 1 : 0;
  const sql = "UPDATE todos SET name = ?, isCompleted = ? WHERE id = ?";
  db.run(sql, [name, editedIsCompleted, id], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ id, name, isCompleted });
  });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM todos WHERE id = ?";
  db.run(sql, id, function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ id });
  });
});
