"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const Table_1 = require("./Table");
class Database {
    constructor() {
        this.tables = new Map();
    }
    // CREATE table
    createTable(name, columns) {
        if (this.tables.has(name)) {
            throw new Error(`Table '${name}' already exists`);
        }
        const table = new Table_1.Table(name, columns);
        this.tables.set(name, table);
    }
    // ACCESS table
    getTable(name) {
        const table = this.tables.get(name);
        if (!table)
            throw new Error(`Table '${name}' does not exist`);
        return table;
    }
    // LIST table names
    listTables() {
        return Array.from(this.tables.keys());
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map