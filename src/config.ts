import dotenv from "dotenv";
dotenv.config();

export const requiredEnv = {
  PORT: "PORT",
  NODE_ENV: "NODE_ENV",
  POSTGRES_USER: "POSTGRES_USER",
  POSTGRES_PASSWORD: "POSTGRES_PASSWORD",
  DATA_DB_HOST: "DATA_DB_HOST",
  DATA_DB_PORT: "DATA_DB_PORT",
  DATA_DB_NAME: "DATA_DB_NAME",
  API_SECRET: "API_SECRET",
  BACKOFFICE_CLIENT_HOST: "BACKOFFICE_CLIENT_HOST",
  PLEDU_CLIENT_HOST: "PLEDU_CLIENT_HOST",
};

export const unsetEnv = Object.keys(requiredEnv).filter(
  (env) => typeof process.env[env] === "undefined"
);

if (unsetEnv.length > 0)
  throw new Error(`Required ENV variables are not set: ${unsetEnv}`);

export const config = {
  PORT: process.env[requiredEnv.PORT],
  ENV: process.env[requiredEnv.NODE_ENV],
  BACKOFFICE_CLIENT_HOST: process.env[requiredEnv.BACKOFFICE_CLIENT_HOST],
  PLEDU_CLIENT_HOST: process.env[requiredEnv.PLEDU_CLIENT_HOST],
};

export const dataDb = {
  host: process.env[requiredEnv.DATA_DB_HOST],
  port: process.env[requiredEnv.DATA_DB_PORT],
  name: process.env[requiredEnv.DATA_DB_NAME],
  user: process.env[requiredEnv.POSTGRES_USER],
  password: process.env[requiredEnv.POSTGRES_PASSWORD],
};

export const jwtConfig = {
  secretKey: process.env[requiredEnv.API_SECRET] || "",
};

export const localhosts = [
  "http://localhost:3002", // backoffice client,
  "http://localhost:3001", // pledu client
];

export default { dataDb, config, jwtConfig, localhosts };
