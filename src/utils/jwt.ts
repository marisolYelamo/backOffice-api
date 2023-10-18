import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";
import ServiceError from "../services/utils/serviceError";
const { secretKey } = jwtConfig;

const createJWT = (content, secret = secretKey, expiration) => {
  const token = jwt.sign(
    {
      content,
      expiresIn: expiration,
    },
    secret
  );

  return token;
};

const verifyJWT = (token, secret = secretKey) =>
  jwt.verify(token, secret, (err) => {
    if (err) throw new ServiceError("invalid_token", err);
    return "Verified token";
  });

const forceDecodeJWT = (token) => {
  const decode = jwt.decode(token);
  return decode;
};

export { createJWT, verifyJWT, forceDecodeJWT };
