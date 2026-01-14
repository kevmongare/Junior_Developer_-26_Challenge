# Pesadb – Mini SQL Database Engine (TypeScript)

Pesadb is a **simple in-memory relational database engine** built in TypeScript.  
It is designed for learning purposes — to understand how SQL parsing, execution,
and basic database concepts work under the hood.

This project supports a small subset of SQL and runs entirely in the terminal
using a custom REPL.

---

##  Features

- In-memory database (no external dependencies)
- SQL-like commands:
  - `CREATE TABLE`
  - `INSERT INTO`
  - `SELECT`
  - `SELECT ... WHERE`
- Column definitions with:
  - name
  - type
  - primary key
  - unique constraints (logical only)
- Interactive command-line REPL
- Clean separation of concerns:
  - Parser
  - Executor
  - Database engine

---

##  Project Structure

```text
src/
├── engine/
│   ├── Database.ts
│   ├── Table.ts
│   └── Column.ts
│
├── sql/
│   ├── Parser.ts
│   └── Executor.ts
│
├── repl.ts
└── index.ts

```

---

##  Running the Project

### Prerequisites
- Node.js (v18 or newer)
- npm

### Install Dependencies
```bash
npm install
```

```bash
npm start
```
---
### Example Usage
```bash
CREATE TABLE users (id INT PRIMARY KEY, name TEXT UNIQUE);
INSERT INTO users VALUES (1, 'Kevin');
SELECT * FROM users;
SELECT * FROM users WHERE id = 1;
```
---
### Limitations
In-memory only (no persistence)

Simplified SQL grammar

No transactions

No query optimizer

Limited command set

These limitations are intentional and explained in detail in DESIGN.md.

---
### Use of AI

AI tools were used only as assistive references (syntax checks, validation).
All design decisions, implementation logic, and documentation were written and understood by me.

---
### Author

Kevin Nyangincha Mongare
