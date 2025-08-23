import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

export const expoDB = openDatabaseSync("db.db");
export const db = drizzle(expoDB);
export function enableForeignKeys() {
  expoDB.execSync("PRAGMA foreign_keys = ON;");
}
