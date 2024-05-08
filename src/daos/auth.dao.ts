import { hashPassword } from "../utils/bcrypt";
import { jwtConfig } from "../config";
import createInsertQuery from "../utils/queryCreators/insertQueryCreator";
import dataDB from "../repositories/dataDb.repository";
const { query } = dataDB;
const { secretKey } = jwtConfig;
class AuthDao {
  static async register(body) {
    const { hash, salt } = await hashPassword(body.password);
    const user = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hash,
      salt,
      secretKey,
    };
    const { psql, queryParams } = createInsertQuery("users", user, true);
    const res = await query(psql, queryParams);
    const userCreated = res.rows[0];
    return userCreated;
  }

  static async getUser(email) {
    const psql = `SELECT * FROM users WHERE email = $1`;
    const res = await query(psql, [email]);
    return res.rows[0];
  }

  static async getUserById(id) {
    const psql = `SELECT * FROM users WHERE id = $1`;
    const res = await query(psql, [id]);
    return res.rows[0];
  }
}

export default AuthDao;
