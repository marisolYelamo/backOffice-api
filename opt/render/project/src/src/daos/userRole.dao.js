"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataDb_repository_1 = __importDefault(require("../repositories/dataDb.repository"));
const { query } = dataDb_repository_1.default;
//needs ts
class userRoleDao {
    static updateUserRoles(userId, rolesIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [userId, ...rolesIds];
            if (!rolesIds.length) {
                const psql = `
      DELETE FROM users_roles WHERE "idUser" = $1;
      `;
                return yield query(psql, [userId]);
            }
            let transactionSql = `
    START TRANSACTION;
    `;
            yield query(transactionSql);
            const deleteSql = `
    DELETE FROM users_roles WHERE "idUser" = $1;
    `;
            yield query(deleteSql, [userId]);
            let insertSql = `INSERT INTO users_roles ("idUser", "idModule", "idRole")
    VALUES`;
            rolesIds.forEach((_role, i) => {
                insertSql +=
                    i !== rolesIds.length - 1
                        ? `($1, 1, $${i + 2}), `
                        : `($1, 1, $${i + 2})`;
            });
            const res = yield query(insertSql, values);
            transactionSql = `
    COMMIT;
  `;
            yield query(transactionSql);
            return res.rows;
        });
    }
}
exports.default = userRoleDao;
