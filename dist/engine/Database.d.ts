import { Table } from "./Table";
import { Column } from "./Column";
export declare class Database {
    private tables;
    constructor();
    createTable(name: string, columns: Column[]): void;
    getTable(name: string): Table;
    listTables(): string[];
}
//# sourceMappingURL=Database.d.ts.map