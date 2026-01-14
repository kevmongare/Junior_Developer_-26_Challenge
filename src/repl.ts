/**
 * repl.ts
 * -------
 * Provides an interactive Read–Eval–Print Loop (REPL)
 * for executing SQL-like commands against the database.
 */

import readline from "readline";
import { Database } from "./engine/Database";
import { Parser } from "./sql/Parser";
import { Executor } from "./sql/Executor";

/**
 * Readline interface used for interactive input.
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "pesadb> "
});

/** Single in-memory database instance */
const db = new Database();

/** Executes parsed SQL commands */
const executor = new Executor(db);

console.log("Pesapal Mini RDBMS");
console.log("End commands with ';'");

rl.prompt();

/**
 * Handles each line of user input:
 * - Parse SQL
 * - Execute command
 * - Print result or error
 */
rl.on("line", (line: string) => {
  try {
    const cmd = Parser.parse(line);
    const result = executor.execute(cmd);
    console.log(result);
  } catch (e: any) {
    console.error("Error:", e.message);
  }

  rl.prompt();
});
