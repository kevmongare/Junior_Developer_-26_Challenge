import readline from "readline";
import { Database } from "./engine/Database";
import { Parser } from "./sql/Parser";
import { Executor } from "./sql/Executor";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "pesadb> "
});

const db = new Database();
const executor = new Executor(db);

console.log("Pesapal Mini RDBMS");
console.log("End commands with ';'");
rl.prompt();

rl.on("line", line => {
  try {
    const cmd = Parser.parse(line);
    const result = executor.execute(cmd);
    console.log(result);
  } catch (e: any) {
    console.error("Error:", e.message);
  }
  rl.prompt();
});
