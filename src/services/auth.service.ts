import AuthDao from "../daos/auth.dao";
import userRoleDao from "../daos/userRole.dao";
import { comparePassword } from "../utils/bcrypt";
import { createJWT } from "../utils/jwt";
import { jwtConfig } from "../config";
const { secretKey } = jwtConfig;
class AuthService {
  static async register(body) {
    const newUser = await AuthDao.register(body);
    await userRoleDao.addUserRoles(newUser.id, 3);
    return newUser;
  }
  static async login(email, password) {
    const user = await AuthDao.getUser(email);
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      throw Error("invalid password");
    } else {
      const token = createJWT(user, secretKey, "365d");
      return { token, email: user.email };
    }
  }
  static async getUserByPk(id) {
    const user = await AuthDao.getUserById(id);
    return user;
  }
}

export default AuthService;
