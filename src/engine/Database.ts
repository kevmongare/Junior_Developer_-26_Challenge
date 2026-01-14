/**
 * Database.ts
 * -----------
 * Implements the top-level database container.
 *
 * The Database is responsible for managing tables,
 * enforcing uniqueness of table names, and providing
 * controlled access to table instances.
 */

import { Table } from "./Table";
import { Column } from "./Column";

/**
 * Represents an in-memory database instance.
 *
 * This class acts as a registry for all tables and
 * serves as the main entry point for database operations.
 */
export class Database {
  /**
   * Internal map of table name → Table instance.
   *
   * A Map is used for constant-time lookup and
   * to enforce unique table names.
   */
  private tables = new Map<string, Table>();

  /**
   * Creates a new table in the database.
   *
   * @param name Name of the table
   * @param columns Column definitions for the table schema
   * @throws Error if a table with the same name already exists
   */
  createTable(name: string, columns: Column[]): void {
    if (this.tables.has(name)) {
      throw new Error(`Table '${name}' already exists`);
    }

    this.tables.set(name, new Table(name, columns));
  }

  /**
   * Retrieves a table by name.
   *
   * @param name Name of the table
   * @returns The requested Table instance
   * @throws Error if the table does not exist
   */
  getTable(name: string): Table {
    const table = this.tables.get(name);

    if (!table) {
      throw new Error(`Table '${name}' not found`);
    }

    return table;
  }

  /**
   * Lists all tables currently registered in the database.
   *
   * @returns Array of table names
   */
  listTables(): string[] {
    return [...this.tables.keys()];
  }
}
