import { Api401Error, Api403Error } from "../utils/http/httpErrors";
import { verifyJWT, forceDecodeJWT } from "../utils/jwt";
import httpStatusCodes from "../utils/http/httpStatusCodes";
import findMaxRole from "../utils/findMaxRole";
const { UNAUTHORIZED } = httpStatusCodes;
interface IDecode {
  content: any;
  iat: number;
}
const authMiddleware = async (req, _res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Api401Error("Authorization header missing");

    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw new Api401Error("Authorization token missing");

    const decode = forceDecodeJWT(token) as IDecode;
    console.log("DECODE", decode);
    if (!decode?.content.email)
      throw new Api403Error("Not allowed to access resource");

    verifyJWT(token);

    req.user = decode.content;

    next();
  } catch (err) {
    if (err.internalError) err.status = UNAUTHORIZED;
    next(err);
  }
};

export default authMiddleware;
