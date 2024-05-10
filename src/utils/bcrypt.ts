import bcrypt from "bcrypt";
import crypto from "crypto";

const hashPassword = async (password) => {
  const salt = genSalt();
  const hash = rebuildPasswordHash(password, salt);
  return { hash, salt };
};

export const genSalt = (): string => {
  const numRounds = 16;
  const saltValue = crypto.randomBytes(16).toString("hex");
  return `$2a$${numRounds}$${saltValue}`;
};

const rebuildPasswordHash = (password, salt) => {
  return crypto
    .createHmac("sha1", salt)
    .update(salt + password)
    .digest("hex");
};
const comparePassword = (password, salt, hash) => {
  const rebuildPass = rebuildPasswordHash(password, salt);
  return rebuildPass === hash;
};

export { hashPassword, comparePassword, rebuildPasswordHash };
