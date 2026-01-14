/**
 * Table.ts
 * --------
 * Defines the core table structure and data storage logic.
 *
 * A Table manages its schema, stored rows, and indexes
 */

import { Column } from "./Column";

/** Represents a single record in a table */
export type Row = Record<string, any>;

/**
 * Represents a database table.
 *
 * Handles:
 * - Row storage
 * - Primary key enforcement
 * - Unique constraints
 * - Indexed lookups
 */
export class Table {
  /** Table name */
  name: string;

  /** Column schema definition */
  columns: Column[];

  /** Stored rows */
  rows: Row[] = [];

  /** Primary key column name (if defined) */
  primaryKey?: string;

  /** Index for fast primary key lookup */
  primaryKeyIndex = new Map<any, Row>();

  /** Indexes enforcing UNIQUE constraints */
  uniqueIndexes = new Map<string, Map<any, Row>>();

  /** General indexes for fast WHERE queries */
  indexes = new Map<string, Map<any, Row[]>>();

  /**
   * Creates a new table and initializes indexes.
   *
   * @param name Table name
   * @param columns Column definitions
   */
  constructor(name: string, columns: Column[]) {
    this.name = name;
    this.columns = columns;

    // Initialize indexes based on column constraints
    for (const col of columns) {
      if (col.primaryKey) this.primaryKey = col.name;
      if (col.unique) this.uniqueIndexes.set(col.name, new Map());
      this.indexes.set(col.name, new Map());
    }
  }

  /**
   * Inserts a row into the table.
   *
   * Enforces primary key and unique constraints
   * and updates all indexes.
   *
   * @param row Record to insert
   * @throws Error if constraints are violated
   */
  insert(row: Row): void {
    if (this.primaryKey) {
      const pk = row[this.primaryKey];
      if (this.primaryKeyIndex.has(pk)) {
        throw new Error(`Duplicate PRIMARY KEY '${pk}'`);
      }
    }

    for (const [col, index] of this.uniqueIndexes) {
      if (index.has(row[col])) {
        throw new Error(`Duplicate UNIQUE value '${row[col]}'`);
      }
    }

    this.rows.push(row);

    if (this.primaryKey) {
      this.primaryKeyIndex.set(row[this.primaryKey], row);
    }

    for (const [col, index] of this.uniqueIndexes) {
      index.set(row[col], row);
    }

    for (const [col, index] of this.indexes) {
      const val = row[col];
      if (!index.has(val)) index.set(val, []);
      index.get(val)!.push(row);
    }
  }

  /**
   * Returns all rows in the table.
   */
  selectAll(): Row[] {
    return this.rows;
  }

  /**
   * Returns rows matching a column value.
   *
   * Uses indexes when available for fast lookup.
   *
   * @param column Column name
   * @param value Value to match
   */
  selectWhere(column: string, value: any): Row[] {
    if (column === this.primaryKey) {
      const row = this.primaryKeyIndex.get(value);
      return row ? [row] : [];
    }

    return this.indexes.get(column)?.get(value) ?? [];
  }
}
