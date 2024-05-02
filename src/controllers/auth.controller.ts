import AuthService from "../services/auth.service";
import { checkAndHandleErrors } from "./utils/handleErros/checkAndHandleErros";
import httpStatusCodes from "../utils/http/httpStatusCodes";
import { success } from "../utils/http/apiResponses";
const { CREATED } = httpStatusCodes;
class AuthController {
  static async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      res.status(CREATED).json(success(CREATED, "User created.", user));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }
}
export default AuthController;
