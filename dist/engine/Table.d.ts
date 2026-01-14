import type { Column } from "./Column";
export type Row = Record<string, any>;
export declare class Table {
    name: string;
    columns: Column[];
    rows: Row[];
    constructor(name: string, columns: Column[]);
    insert(row: Row): void;
    select(where?: (row: Row) => boolean): Row[];
    delete(where: (row: Row) => boolean): void;
    update(where: (row: Row) => boolean, updates: Partial<Row>): void;
}
//# sourceMappingURL=Table.d.ts.map