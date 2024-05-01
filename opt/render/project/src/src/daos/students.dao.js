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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataDb_repository_1 = __importDefault(require("../repositories/dataDb.repository"));
const { query } = dataDb_repository_1.default;
class StudentDao {
    static getCohortsStudents(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            const { inscRole } = conditions, cohortConditions = __rest(conditions, ["inscRole"]);
            const cohortFilters = Object.keys(cohortConditions)
                .map((_key, i) => `cohort.label LIKE '%'||$${i + 1}||'%'`)
                .join(" AND ");
            const psqlUsers = `SELECT DISTINCT userRole."idUser" AS "UserId", 
    jsonb_agg(DISTINCT jsonb_build_object(
      'id', role.id,
      'name', role.name)) AS roles
    FROM users_roles AS userRole
    JOIN roles as role ON role.id = userRole."idRole"
    GROUP BY userRole."idUser"
    HAVING bool_or(role.id = ${inscRole})`;
            const psqlStudents = `SELECT DISTINCT user_commission."UserId"
      FROM cohort
      JOIN commission ON cohort.id = commission."cohortId"
      JOIN user_commission ON commission.id = user_commission."CommissionId" 
      ${Object.entries(cohortConditions).length ? "WHERE " + cohortFilters : ""} 
     GROUP BY user_commission."UserId"`;
            const res = yield query(inscRole ? psqlUsers : psqlStudents, Object.values(cohortConditions));
            return res.rows;
        });
    }
}
exports.default = StudentDao;
