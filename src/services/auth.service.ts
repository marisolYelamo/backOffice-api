import AuthDao from "../daos/auth.dao";

class AuthService {
  static async register(body) {
    const newUser = await AuthDao.register(body);
    return newUser;
  }
}

export default AuthService;
