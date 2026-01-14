"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("./engine/Database");
// Initialize database
const db = new Database_1.Database();
// Create a table
db.createTable("users", [
    { name: "id", type: "INT", primaryKey: true },
    { name: "email", type: "TEXT", unique: true }
]);
console.log("Tables in DB:", db.listTables());
// Access the table
const users = db.getTable("users");
// CREATE: insert rows
users.insert({ id: 1, email: "a@pesapal.com" });
users.insert({ id: 2, email: "b@pesapal.com" });
console.log("\nAll users after insert:");
console.log(users.select());
// READ: select with condition
const user1 = users.select(row => row.id === 1);
console.log("\nUser with id=1:");
console.log(user1);
// UPDATE
users.update(row => row.id === 1, { email: "updated@pesapal.com" });
console.log("\nAll users after update:");
console.log(users.select());
// DELETE
users.delete(row => row.id === 2);
console.log("\nAll users after delete:");
console.log(users.select());
//# sourceMappingURL=index.js.map