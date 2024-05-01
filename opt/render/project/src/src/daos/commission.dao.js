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
const insertQueryCreator_1 = __importDefault(require("../utils/queryCreators/insertQueryCreator"));
const updateQueryCreator_1 = __importDefault(require("../utils/queryCreators/updateQueryCreator"));
class CommissionDao {
    static create(commission) {
        return __awaiter(this, void 0, void 0, function* () {
            const { psql, queryParams } = (0, insertQueryCreator_1.default)("commission", commission, true);
            const res = yield query(psql, queryParams);
            const commissionCreated = res.rows[0];
            return commissionCreated;
        });
    }
    static get(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryField = field === "id" ? "commission.id" : field;
            const psql = `SELECT commission.*, 
    (SELECT json_agg(DISTINCT user_commission."UserId") FROM user_commission WHERE commission.id = user_commission."CommissionId") as users,
    CASE 
      WHEN (SELECT COUNT(*) FROM user_commission WHERE commission.id = user_commission."CommissionId") = 0 THEN '[]'
      ELSE (SELECT json_agg(DISTINCT user_commission."UserId") FROM user_commission WHERE commission.id = user_commission."CommissionId")
    END as users,
      json_build_object(
        'id', cohort.id,
        'label', cohort."label",
        'discordRoleId', cohort."discordRoleId",
        'discordChannelsIds', cohort."discordChannelsIds",
        'createdAt', cohort."createdAt",
        'updatedAt', cohort."updatedAt"
      ) as cohort
    FROM commission
    LEFT JOIN cohort ON commission."cohortId" = cohort.id
    LEFT JOIN user_commission ON commission.id = user_commission."CommissionId"
    WHERE ${queryField} = $1
    GROUP BY commission.id,cohort.id
  `;
            const res = yield query(psql, [value]);
            if (!res.rows.length)
                return null;
            return res.rows[0];
        });
    }
    static update(id, commission) {
        return __awaiter(this, void 0, void 0, function* () {
            const { psql, queryParams } = (0, updateQueryCreator_1.default)("commission", id, commission);
            yield query(psql, queryParams);
            return this.get("id", id);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const psql = "DELETE FROM commission WHERE id=$1 RETURNING *";
            const res = yield query(psql, [id]);
            return res.rows[0];
        });
    }
    static addUserToCommission(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const psql = `INSERT INTO user_commission ("UserId", "CommissionId") VALUES ($1, $2) `;
            const res = yield query(psql, [userId, id]);
            return res;
        });
    }
    static removeUserFromCommission(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const psql = `DELETE FROM user_commission WHERE "UserId"=$1 AND "CommissionId"=$2 `;
            const res = yield query(psql, [userId, id]);
            return res;
        });
    }
    static getUserCommissions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const psql = `SELECT commission.*, 
      json_build_object(
        'id', cohort.id,
        'label', cohort."label",
        'discordRoleId', cohort."discordRoleId",
        'discordChannelsIds', cohort."discordChannelsIds",
        'createdAt', cohort."createdAt",
        'updatedAt', cohort."updatedAt"
      ) as cohort
    FROM commission
    LEFT JOIN cohort ON commission."cohortId" = cohort.id
    LEFT JOIN user_commission ON commission.id = user_commission."CommissionId"
    WHERE user_commission."UserId"= $1
    GROUP BY commission.id,cohort.id`;
            const res = yield query(psql, [userId]);
            return res.rows;
        });
    }
}
exports.default = CommissionDao;
