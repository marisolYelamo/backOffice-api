"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localhosts = exports.jwtConfig = exports.dataDb = exports.config = exports.unsetEnv = exports.requiredEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.requiredEnv = {
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
exports.unsetEnv = Object.keys(exports.requiredEnv).filter((env) => typeof process.env[env] === "undefined");
if (exports.unsetEnv.length > 0)
    throw new Error(`Required ENV variables are not set: ${exports.unsetEnv}`);
exports.config = {
    PORT: process.env[exports.requiredEnv.PORT],
    ENV: process.env[exports.requiredEnv.NODE_ENV],
    BACKOFFICE_CLIENT_HOST: process.env[exports.requiredEnv.BACKOFFICE_CLIENT_HOST],
    PLEDU_CLIENT_HOST: process.env[exports.requiredEnv.PLEDU_CLIENT_HOST],
};
exports.dataDb = {
    host: process.env[exports.requiredEnv.DATA_DB_HOST],
    port: process.env[exports.requiredEnv.DATA_DB_PORT],
    name: process.env[exports.requiredEnv.DATA_DB_NAME],
    user: process.env[exports.requiredEnv.POSTGRES_USER],
    password: process.env[exports.requiredEnv.POSTGRES_PASSWORD],
};
exports.jwtConfig = {
    secretKey: process.env[exports.requiredEnv.API_SECRET] || "",
};
exports.localhosts = [
    "http://localhost:3002",
    "http://localhost:3001", // pledu client
];
exports.default = { dataDb: exports.dataDb, config: exports.config, jwtConfig: exports.jwtConfig, localhosts: exports.localhosts };
