import util from "util";
import { Pool } from "pg";
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
  user: any;
  host: any;
  database: any;
  password: any;
  port: any;
  pool: any;
  constructor(user, host, database, password, port) {
    this.user = user;
    this.host = host;
    this.database = database;
    this.password = password;
    this.port = port;
    this.pool = null;
  }

  connect() {
    this.pool = new Pool({
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
    this.pool.query = util.promisify(this.pool.query);
  }

  disconnect() {
    return new Promise<void>((resolve, reject) => {
      this.pool.end((err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  async query(query, values) {
    try {
      const result = await this.pool.query(query, values);
      return result;
    } catch (error) {
      console.error(
        `Error on ${this.database} pool request. With value: ${error}`
      );
      throw error;
    }
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
  const query = (query, values?) => base.query(query, values);

  return { connect, disconnect, query };
};

export default psql;
