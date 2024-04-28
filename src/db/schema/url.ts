import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const URLSchema = pgTable("url", {
  id: serial("id").primaryKey().notNull(),
  url: text("url").notNull(),
  urlId: text("url_id").notNull(),
  shortUrl: text("short_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});
