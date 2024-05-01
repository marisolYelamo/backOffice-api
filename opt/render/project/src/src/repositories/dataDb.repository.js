"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const psql_respository_1 = __importDefault(require("./psql.respository"));
const config_1 = require("../config");
const { user, host, name, password, port } = config_1.dataDb;
const dataDB = (0, psql_respository_1.default)(user, host, name, password, port);
exports.default = dataDB;
