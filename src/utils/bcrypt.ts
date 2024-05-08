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
<<<<<<< HEAD
const comparePassword = (password, salt, hash) => {
=======
const comparePassword = async (password, salt, hash) => {
>>>>>>> 22c5c452bdc8cf430e31f3ff7777aab908ae0d19
  const rebuildPass = rebuildPasswordHash(password, salt);
  return rebuildPass === hash;
};

export { hashPassword, comparePassword, rebuildPasswordHash };
