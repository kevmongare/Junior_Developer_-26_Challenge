export type SQLCommand =
  | { type: "CREATE_TABLE"; table: string; columns: any[] }
  | { type: "INSERT"; table: string; values: any[] }
  | { type: "SELECT"; table: string; where?: { column: string; value: any } };

export class Parser {
  static parse(input: string): SQLCommand {
    const sql = input.trim().replace(/;$/, "");

    if (sql.startsWith("CREATE TABLE")) {
      const table = sql.split(" ")[2];
      const cols = sql.match(/\((.*)\)/)![1]
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
      return { type: "CREATE_TABLE", table, columns: cols };
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
        const col = parts[5];
        const val = parts[7].replace(/^'|'$/g, "");
        return { type: "SELECT", table, where: { column: col, value: val } };
      }
      return { type: "SELECT", table };
    }

    throw new Error("Invalid SQL");
  }
}
