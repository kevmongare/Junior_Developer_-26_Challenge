/**
 * Executor.ts
 * ----------
 * Executes parsed SQL commands against the database engine.
 *
 * This class acts as the bridge between the SQL parser
 * and the core database implementation.
 */

import { Database } from "../engine/Database";
import { SQLCommand } from "./Parser";

/**
 * Responsible for executing SQLCommand objects
 * by invoking the appropriate database operations.
 */
export class Executor {
  /**
   * Creates a new Executor instance.
   *
   * @param db Database instance to execute commands against
   */
  constructor(private db: Database) {}

  /**
   * Executes a parsed SQL command.
   *
   * @param cmd Parsed SQL command
   * @returns Result of the operation
   */
  execute(cmd: SQLCommand): any {
    if (cmd.type === "CREATE_TABLE") {
      this.db.createTable(cmd.table, cmd.columns);
      return `Table '${cmd.table}' created`;
    }

    if (cmd.type === "INSERT") {
      const table = this.db.getTable(cmd.table);
      const row: any = {};

      // Map column names to provided values
      table.columns.forEach((c, i) => {
        row[c.name] = cmd.values[i];
      });

      table.insert(row);
      return "1 row inserted";
    }

    if (cmd.type === "SELECT") {
      const table = this.db.getTable(cmd.table);

      if (cmd.where) {
        return table.selectWhere(cmd.where.column, cmd.where.value);
      }

      return table.selectAll();
    }
  }
}
