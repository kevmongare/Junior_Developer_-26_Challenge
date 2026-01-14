# Pesadb – Design Document

Pesadb is a lightweight, in-memory relational database engine written in TypeScript.
It is built for educational/interview purposes to demonstrate how SQL databases work internally.

---

##  Design Goals

- Simplicity over completeness
- Easy-to-read and beginner-friendly code
- Clear separation of responsibilities
- No external database dependencies
- Focus on learning core database concepts

---

##  High-Level Architecture

Pesadb uses a layered architecture where each layer has a single responsibility.

```text
┌──────────────┐
│     REPL     │  Handles user input/output
└──────┬───────┘
       ↓
┌──────────────┐
│    Parser    │  Converts SQL text into commands
└──────┬───────┘
       ↓
┌──────────────┐
│   Executor   │  Executes parsed commands
└──────┬───────┘
       ↓
┌──────────────┐
│   Database   │  Manages tables
└──────┬───────┘
       ↓
┌──────────────┐
│    Table     │  Stores rows and schema
└──────────────┘
```
---
### Core Components
REPL Layer

Runs an interactive terminal

Accepts SQL commands

Displays query results or errors

---
### Parser Layer

Parses SQL strings into structured command objects

Supports:

CREATE TABLE

INSERT INTO

SELECT

Uses simple string parsing and regex

Does not enforce strict SQL grammar (However its important to check the case of the wording/text)

---
### Executor Layer

Acts as the command dispatcher

Maps parsed commands to database actions

Contains no SQL parsing logic

---
### Stores tables using a Map<string, Table>

Responsible for table creation and retrieval

Ensures table names are unique

---
### Table Layer

Stores rows as plain JavaScript objects

Handles insert and select operations

Supports simple WHERE column = value filtering

---
### Column Definition

Represents table schema

Holds metadata such as:

name

type

primary key

unique constraint

Constraints are informational only

---
### Data Flow Example

```bash
INSERT INTO users VALUES ('1', 'Kevin');
```

Input is received by the REPL

Parser creates an INSERT command object

Executor inserts a row into the table

Table stores the row in memory
---
### Design Limitations

No persistent storage

No indexing

No joins or aggregations

No update or delete operations

Minimal error handling
---
### Extensibility

Pesadb can be extended by:

Adding new SQL commands

Implementing file-based storage

Enforcing column constraints

Adding indexing for faster lookups
---
### Educational and interview Focus


Serve as a stepping stone to real databases to demonstrate the workings of a RDMS
----
### Summary

Pesadb prioritizes clarity and learning over performance and completeness.
It is not a production database.
