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
class CohortDao {
    static create(cohort) {
        return __awaiter(this, void 0, void 0, function* () {
            const { psql, queryParams } = (0, insertQueryCreator_1.default)("cohort", cohort, true);
            const res = yield query(psql, queryParams);
            const cohortCreated = res.rows[0];
            return cohortCreated;
        });
    }
    static get(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereCondition = `WHERE cohort."${field}" = $1 `;
            const psql = `WITH cte as (
      SELECT 
      DISTINCT ON (commission.id) commission.id as commission_id,
      cohort.id as cohort_id,
      cohort.label as cohort_label,
      cohort."discordRoleId" as cohort_discordRoleId,
      cohort."discordChannelsIds" as cohort_discordChannelsIds,
      cohort."createdAt" as cohort_createdAt,
      cohort."updatedAt" as cohort_updatedAt,
      commission.name as commission_name, 
      commission."cohortId" as commission_cohortId,
      commission."discordRoleId" as commission_discordRoleId,
      commission."discordChannelsIds" as commission_discordChannelsIds,
      commission."createdAt" as commission_createdAt,
      commission."updatedAt" as commission_updatedAt,
      CASE 
        WHEN (SELECT COUNT(*) FROM user_commission WHERE commission.id = user_commission."CommissionId") = 0 THEN '[]'
        ELSE (SELECT json_agg(DISTINCT user_commission."UserId") FROM user_commission WHERE commission.id = user_commission."CommissionId")
      END as users
      FROM (SELECT DISTINCT ON (id) * FROM cohort) as cohort
      LEFT JOIN commission ON cohort.id = commission."cohortId"
      LEFT JOIN user_commission ON commission.id = user_commission."CommissionId"
      ${whereCondition}
      )
      SELECT json_build_object(
      'id',cohort_id,
      'label',cohort_label,
      'discordRoleId',cohort_discordRoleId,
      'discordChannelsIds',cohort_discordChannelsIds,
      'createdAt',cohort_createdAt,
      'updatedAt',cohort_updatedAt,
      'commissions', 
      CASE 
      WHEN (SELECT COUNT(*) FROM commission WHERE commission."cohortId" = cohort_id) = 0 THEN '[]'
      ELSE json_agg(
        json_build_object(
        'id', commission_id,
        'name', commission_name,
        'cohortId', commission_cohortId,
        'discordRoleId', commission_discordRoleId,
        'discordChannelsIds', commission_discordChannelsIds,
        'createdAt', commission_createdAt,
        'updatedAt', commission_updatedAt,
        'users', users
        )
        )
      END
      )
      FROM cte
      GROUP BY cohort_id, cohort_label,cohort_discordRoleId, cohort_discordChannelsIds, cohort_createdAt, cohort_updatedAt
      ORDER BY cohort_createdAt, cohort_updatedAt`;
            // coh INNER JOIN commission com ON coh.id = com.id INNER JOIN user_commission uc ON com.id = uc."CommissionId"
            const res = yield query(psql, [value]);
            if (!res.rows.length)
                return null;
            return res.rows[0].json_build_object;
        });
    }
    static update(id, cohort) {
        return __awaiter(this, void 0, void 0, function* () {
            const { psql, queryParams } = (0, updateQueryCreator_1.default)("cohort", id, cohort);
            yield query(psql, queryParams);
            return this.get("id", id);
        });
    }
    static getAll(offset, limit, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [];
            const keys = condition ? Object.keys(condition) : [];
            let filters = "";
            if (keys.length) {
                filters += "WHERE ";
                keys.forEach((key, i) => {
                    values.push(condition[key]); //type this
                    if (key === "label")
                        filters += `cohort."${key}" ILIKE '%'||$${i + 1}||'%' `;
                    else
                        filters += `cohort."${key}" = $${i + 1} `;
                    if (i !== keys.length - 1)
                        filters += "AND ";
                });
            }
            if (limit)
                filters += ` LIMIT ${limit}`;
            if (offset)
                filters += ` OFFSET ${offset}`;
            const psql = `WITH cte as (
      SELECT 
      DISTINCT ON (commission.id) commission.id as commission_id,
      cohort.id as cohort_id,
      cohort.label as cohort_label,
      cohort."discordRoleId" as cohort_discordRoleId,
      cohort."discordChannelsIds" as cohort_discordChannelsIds,
      cohort."createdAt" as cohort_createdAt,
      cohort."updatedAt" as cohort_updatedAt,
      commission.name as commission_name, 
      commission."cohortId" as commission_cohortId,
      commission."discordRoleId" as commission_discordRoleId,
      commission."discordChannelsIds" as commission_discordChannelsIds,
      commission."createdAt" as commission_createdAt,
      commission."updatedAt" as commission_updatedAt,
      CASE 
        WHEN (SELECT COUNT(*) FROM user_commission WHERE commission.id = user_commission."CommissionId") = 0 THEN '[]'
        ELSE (SELECT json_agg(DISTINCT user_commission."UserId") FROM user_commission WHERE commission.id = user_commission."CommissionId")
      END as users
      FROM (SELECT DISTINCT ON (id) * FROM cohort) as cohort
      LEFT JOIN commission ON cohort.id = commission."cohortId"
      LEFT JOIN user_commission ON commission.id = user_commission."CommissionId"
      ${filters}
      )
      SELECT json_build_object(
      'id',cohort_id,
      'label',cohort_label,
      'discordRoleId',cohort_discordRoleId,
      'discordChannelsIds',cohort_discordChannelsIds,
      'createdAt',cohort_createdAt,
      'updatedAt',cohort_updatedAt,
      'commissions', 
      CASE 
      WHEN (SELECT COUNT(*) FROM commission WHERE commission."cohortId" = cohort_id) = 0 THEN '[]'
      ELSE json_agg(
        json_build_object(
        'id', commission_id,
        'name', commission_name,
        'cohortId', commission_cohortId,
        'discordRoleId', commission_discordRoleId,
        'discordChannelsIds', commission_discordChannelsIds,
        'createdAt', commission_createdAt,
        'updatedAt', commission_updatedAt,
        'users', users
        )
        )
      END
      )
      FROM cte
      GROUP BY cohort_id, cohort_label,cohort_discordRoleId, cohort_discordChannelsIds, cohort_createdAt, cohort_updatedAt
      ORDER BY cohort_createdAt, cohort_updatedAt
      `;
            const res = yield query(psql, values);
            const mappedRes = res.rows.map((row) => {
                return row.json_build_object;
            });
            return mappedRes;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const psql = "DELETE FROM cohort WHERE id=$1 RETURNING *";
            const res = yield query(psql, [id]);
            return res.rows[0];
        });
    }
}
exports.default = CohortDao;
