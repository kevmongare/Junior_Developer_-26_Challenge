/**
 * Parser.ts
 * ---------
 * Converts SQL-like strings into structured command objects.
 *
 * The parser supports a minimal subset of SQL required
 * to demonstrate core database functionality.
 */

/**
 * Represents a parsed SQL command.
 *
 * Each variant contains only the data needed
 * for execution by the Executor.
 */
export type SQLCommand =
  | { type: "CREATE_TABLE"; table: string; columns: any[] }
  | { type: "INSERT"; table: string; values: any[] }
  | { type: "SELECT"; table: string; where?: { column: string; value: any } };

/**
 * Simple SQL parser implementation.
 *
 * This parser is intentionally limited and uses
 * string operations instead of a full SQL grammar
 * to keep the implementation readable.
 */
export class Parser {
  /**
   * Parses raw SQL input into a SQLCommand.
   *
   * @param input Raw SQL string
   * @returns Parsed SQL command
   * @throws Error if the SQL syntax is invalid or unsupported
   */
  static parse(input: string): SQLCommand {
    const sql = input.trim().replace(/;$/, "");

    if (sql.startsWith("CREATE TABLE")) {
      const table = sql.split(" ")[2];

      const columns = sql.match(/\((.*)\)/)![1]
        .split(",")
        .map(c => {
          const parts = c.trim().split(" ");
          return {
            name: parts[0],
            type: parts[1],
            primaryKey: parts.includes("PRIMARY"),
            unique: parts.includes("UNIQUE")
          };
        });

      return { type: "CREATE_TABLE", table, columns };
    }

    if (sql.startsWith("INSERT INTO")) {
      const table = sql.split(" ")[2];

      const values = sql.match(/\((.*)\)/)![1]
        .split(",")
        .map(v => v.trim().replace(/^'|'$/g, ""));

      return { type: "INSERT", table, values };
    }

    if (sql.startsWith("SELECT")) {
      const parts = sql.split(" ");
      const table = parts[3];

      if (sql.includes("WHERE")) {
        const column = parts[5];
        const value = parts[7].replace(/^'|'$/g, "");

        return { type: "SELECT", table, where: { column, value } };
      }

      return { type: "SELECT", table };
    }

    throw new Error("Invalid SQL");
  }
}
