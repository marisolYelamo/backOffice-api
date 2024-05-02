import AuthDao from "../daos/auth.dao";
import { comparePassword } from "../utils/bcrypt";
import { createJWT } from "../utils/jwt";
class AuthService {
  static async register(body) {
    const newUser = await AuthDao.register(body);
    return newUser;
  }
  static async login(email, password) {
    const user = await AuthDao.getUser(email);
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      throw Error("invalid password");
    } else {
      const token = createJWT(user, "", "365d");
      return { token, email: user.email };
    }
  }
}

export default AuthService;
