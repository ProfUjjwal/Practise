import dotenv from "dotenv";
import type { Knex } from "knex";
import path from "path";

export const loadDotEnv = (zodeEnv: string = "local") => {
  dotenv.config({ path: path.resolve(`./configs/.${zodeEnv}.env`) });
  dotenv.config({ path: path.resolve("./configs/.env") });
};

loadDotEnv();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve("./migrations"),
    },
  },
};

module.exports = config;
