import "dotenv/config";

const applicationConfig = {
  port: process.env.PORT || 3000,
  base: process.env.BASE_URL || "http://localhost:3000",
  // Database
  db: {
    dbDialect: process.env.DB_DIALECT || "postgres",
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 5432,
  },
};

export default applicationConfig;
