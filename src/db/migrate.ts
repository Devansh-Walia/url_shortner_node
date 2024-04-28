import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
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

const main = () => {
  migrate(db, { migrationsFolder: "drizzle" })
    .then(() => {
      console.log("Migrations complete!");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

main();
