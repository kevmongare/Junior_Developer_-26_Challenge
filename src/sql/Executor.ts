import { Database } from "../engine/Database";
import { SQLCommand } from "./Parser";

export class Executor {
  constructor(private db: Database) {}

  execute(cmd: SQLCommand): any {
    if (cmd.type === "CREATE_TABLE") {
      this.db.createTable(cmd.table, cmd.columns);
      return `Table '${cmd.table}' created`;
    }

    if (cmd.type === "INSERT") {
      const table = this.db.getTable(cmd.table);
      const row: any = {};
      table.columns.forEach((c, i) => (row[c.name] = cmd.values[i]));
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
