/**
 * --------
 *
 * This file defines the core schema primitives that describe
 * how tables and columns are structured.
 */

/**
 * Supported primitive data types in the database.
 *
 * INT   → Numeric integer values
 * TEXT  → Variable-length string values
 *
 * The limited set is intentional to keep the engine simple
 * and focused on relational fundamentals.
 */
export type DataType = "INT" | "TEXT";

/**
 * Describes a column within a table schema.
 * Column metadata is used during:
 * - Table creation
 * - Insert validation
 * - Query execution
 */
export interface Column {
  /** Name of the column (must be unique per table) and is a string */
  name: string;

  /** Data type of the column */
  type: DataType;

  /**
   * Marks this column as the table's primary key.
   * - Must be unique and Cannot be null
   */
  primaryKey?: boolean;

  /**
   * Enforces uniqueness across all rows for this column.
   */
  unique?: boolean;
}
