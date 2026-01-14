import express from "express";
import { Database } from "../engine/Database";

const app = express();
app.use(express.json());

// Initialize DB
const db = new Database();

// Create table at startup
db.createTable("users", [
  { name: "id", type: "INT", primaryKey: true },
  { name: "email", type: "TEXT", unique: true }
]);

const users = db.getTable("users");

/**
 * CREATE user
 */
app.post("/users", (req, res) => {
  try {
    users.insert(req.body);
    res.status(201).json({ message: "User created" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * READ all users
 */
app.get("/users", (_req, res) => {
  res.json(users.selectAll());
});

/**
 * READ user by ID (uses PRIMARY KEY INDEX)
 */
app.get("/users/:id", (req, res) => {
  const result = users.selectWhere("id", Number(req.params.id));
  if (result.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(result[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Web app running on http://localhost:${PORT}`);
});
