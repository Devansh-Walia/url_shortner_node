import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import applicationConfig from "../../config";

const postgresSql = postgres({
  host: applicationConfig.db.host,
  user: applicationConfig.db.user,
  password: applicationConfig.db.password,
  database: applicationConfig.db.name,
  port: applicationConfig.db.port,
  max: 1,
});
const db = drizzle(postgresSql);

export default db;
