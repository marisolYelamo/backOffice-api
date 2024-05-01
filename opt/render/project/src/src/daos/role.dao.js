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
class RoleDao {
    static get(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const psql = `SELECT id, name FROM roles WHERE ${field} = $1`;
            const res = yield query(psql, [value]);
            return res.rows[0];
        });
    }
    static getRolesToUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const psql = `SELECT 
                   userRole."idUser",
                   json_agg(json_build_object(
                     'id', role.id,
                     'name', role.name,
                     'module', modulesUser.name)) AS roles
                  FROM roles AS role
                  JOIN users_roles AS userRole ON userRole."idRole" = role.id  
                  JOIN modules as modulesUser ON userRole."idModule" = modulesUser.id 
                 WHERE userRole."idUser"=${userId}
                 GROUP BY userRole."idUser"`;
            const res = yield query(psql);
            return res.rows[0] ? res.rows[0].roles : [];
        });
    }
    static getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const psql = `SELECT * FROM roles`;
            const res = yield query(psql);
            return res.rows;
        });
    }
}
exports.default = RoleDao;
