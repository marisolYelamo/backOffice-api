import bcrypt from "bcrypt";
import crypto from "crypto";

const hashPassword = async (password) => {
  const salt = genSalt();
  const hash = await bcrypt.hash(password, salt);
  return { hash, salt };
};

export const genSalt = (): string => {
  return crypto.randomBytes(64).toString("hex");
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
