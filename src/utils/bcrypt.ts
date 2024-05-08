import bcrypt from "bcrypt";
import crypto from "crypto";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
const rebuildPasswordHash = (password, salt) => {
  return crypto
    .createHmac("sha1", salt)
    .update(salt + password)
    .digest("hex");
};
const comparePassword = async (password, salt, hash) => {
  const rebuildPass = rebuildPasswordHash(password, salt);
  return rebuildPass === hash;
};

export { hashPassword, comparePassword, rebuildPasswordHash };
