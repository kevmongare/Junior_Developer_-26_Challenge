"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
class Table {
    constructor(name, columns) {
        this.name = name;
        this.columns = columns;
        this.rows = [];
    }
    // CREATE
    insert(row) {
        this.rows.push(row);
    }
    // READ
    select(where) {
        if (!where) {
            return this.rows;
        }
        return this.rows.filter(where);
    }
    // DELETE
    delete(where) {
        this.rows = this.rows.filter(row => !where(row));
    }
    // UPDATE
    update(where, updates) {
        for (const row of this.rows) {
            if (where(row)) {
                Object.assign(row, updates);
            }
        }
    }
}
exports.Table = Table;
//# sourceMappingURL=Table.js.map