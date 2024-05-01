"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const pg_1 = require("pg");
//needs ts translation
/**
 *
 * @constructor
 * @param {string} user
 * @param {string} host
 * @param {string} database
 * @param {string} password
 * @param {number} port
 *
 */
class PsqlRepository {
    constructor(user, host, database, password, port) {
        this.user = user;
        this.host = host;
        this.database = database;
        this.password = password;
        this.port = port;
        this.pool = null;
    }
    connect() {
        this.pool = new pg_1.Pool({
            max: 50,
            user: this.user,
            host: this.host,
            database: this.database,
            password: this.password,
            port: this.port,
        });
        this.pool.connect((err, client, release) => {
            if (err) {
                console.error("Error acquiring client", err.stack);
                throw err;
            }
            client.query("SELECT NOW()", (err, result) => {
                release();
                if (err) {
                    return console.error("Error executing query", err.stack);
                }
                console.log("Connected at", result.rows[0].now);
            });
        });
        // Promisify for Node.js async/await.
        this.pool.query = util_1.default.promisify(this.pool.query);
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            this.pool.end((err) => {
                if (err)
                    reject(err);
                resolve();
            });
        });
    }
    query(query, values) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query(query, values);
                return result;
            }
            catch (error) {
                console.error(`Error on ${this.database} pool request. With value: ${error}`);
                throw error;
            }
        });
    }
}
const psql = (user, host, database, password, port) => {
    let base;
    /**
     * @description Connect to database and set pool
     */
    const connect = () => {
        base = new PsqlRepository(user, host, database, password, port);
        base.connect();
    };
    /**
     * @description force destroy psql connection
     */
    const disconnect = () => base.disconnect();
    /**
     *
     * @param {string} query
     * @param {Array} values
     */
    const query = (query, values) => base.query(query, values);
    return { connect, disconnect, query };
};
exports.default = psql;
