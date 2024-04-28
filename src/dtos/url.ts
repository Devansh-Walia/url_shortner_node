import { URLSchema } from "../db/schema/url";

export type CreateUrl = typeof URLSchema.$inferInsert;
export type Url = typeof URLSchema.$inferSelect;
