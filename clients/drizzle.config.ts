import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  driver: "expo",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: "./db/database.db", // or whatever your database file is named
  },
});
