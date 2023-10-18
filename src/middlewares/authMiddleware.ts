import { Api401Error, Api403Error } from "../utils/http/httpErrors";
import { verifyJWT, forceDecodeJWT } from "../utils/jwt";
import httpStatusCodes from "../utils/http/httpStatusCodes";
import findMaxRole from "../utils/findMaxRole";
const { UNAUTHORIZED } = httpStatusCodes;

const authMiddleware = async (req, _res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Api401Error("Authorization header missing");

    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw new Api401Error("Authorization token missing");

    const decode = forceDecodeJWT(token);

    if (!decode.user && !decode.service)
      throw new Api403Error("Not allowed to access resource");

    verifyJWT(token);

    if (decode.service) {
      switch (decode.service) {
        case "discord-bot":
          req.role = "bot";
          break;
        case "pledu-bff":
          req.role = "pledu";
          break;
        case "landing-bff":
          req.role = "landing";
          break;
      }
    } else {
      req.role = decode?.user?.roles
        ? findMaxRole(decode.user.roles)
        : "anonymous";
      req.user = decode.user;
    }

    next();
  } catch (err) {
    if (err.internalError) err.status = UNAUTHORIZED;
    next(err);
  }
};

export default authMiddleware;
