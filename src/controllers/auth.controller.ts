import AuthService from "../services/auth.service";
import { checkAndHandleErrors } from "./utils/handleErros/checkAndHandleErros";
import httpStatusCodes from "../utils/http/httpStatusCodes";
import { success } from "../utils/http/apiResponses";
const { OK, CREATED } = httpStatusCodes;
class AuthController {
  static async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      res.status(CREATED).json(success(CREATED, "User created.", user));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  static async login(req, res, next) {
    try {
      const login = await AuthService.login(req.body.email, req.body.password);
      res.status(OK).json(success(OK, "User login.", login));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }
}
export default AuthController;
