import { hashPassword } from "../utils/bcrypt";
import createInsertQuery from "../utils/queryCreators/insertQueryCreator";
import dataDB from "../repositories/dataDb.repository";
const { query } = dataDB;
class AuthDao {
  static async register(body) {
    const user = {
      firstName: body.firstName,
      email: body.email,
      password: hashPassword(body.password),
      secretKey: "",
    };
    const { psql, queryParams } = createInsertQuery("users", user, true);
    const res = await query(psql, queryParams);
    const userCreated = res.rows[0];
    return userCreated;
  }
}

export default AuthDao;
