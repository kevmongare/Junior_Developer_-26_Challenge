# Pesadb – Mini SQL Database Engine (TypeScript)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![MIT License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Educational-orange) 

This project was built as part of the **Pesapal Junior Developer Challenge**.

### Objective
To demonstrate:
- Core programming fundamentals
- Ability to design systems from first principles
- Understanding of how databases work internally
- Clean, readable, and well-documented code

### Why a Mini RDBMS?
Instead of using an existing database, this project implements:
- SQL parsing
- Command execution
- Table management
- In-memory data storage


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
##  Possible Improvements
- Persistent file-based storage
- Indexing for faster lookups
- UPDATE and DELETE support
- More robust SQL grammar
- Basic transaction support
---
### Use of AI

AI tools were used only as assistive references (syntax checks, validation).
All design decisions, implementation logic, and documentation were written and understood by me.

---
### Author

Kevin Nyangincha Mongare
