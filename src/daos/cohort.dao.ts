import dataDB from "../repositories/dataDb.repository";
const { query } = dataDB;
import createInsertQuery from "../utils/queryCreators/insertQueryCreator";
import createUpdateQuery from "../utils/queryCreators/updateQueryCreator";

class CohortDao {
  static async create(cohort) {
    const { psql, queryParams } = createInsertQuery("cohort", cohort, true);

    const res = await query(psql, queryParams);
    const cohortCreated = res.rows[0];

    return cohortCreated;
  }

  static async get(field, value) {
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
    const res = await query(psql, [value]);

    if (!res.rows.length) return null;

    return res.rows[0].json_build_object;
  }

  static async update(id, cohort) {
    const { psql, queryParams } = createUpdateQuery("cohort", id, cohort);
    await query(psql, queryParams);
    return this.get("id", id);
  }

  static async getAll(offset, limit, condition) {
    const values: string[] = [];
    const keys = condition ? Object.keys(condition) : [];
    let filters = "";
    if (keys.length) {
      filters += "WHERE ";

      keys.forEach((key, i) => {
        values.push(condition[key]); //type this
        if (key === "label")
          filters += `cohort."${key}" ILIKE '%'||$${i + 1}||'%' `;
        else filters += `cohort."${key}" = $${i + 1} `;
        if (i !== keys.length - 1) filters += "AND ";
      });
    }

    if (limit) filters += ` LIMIT ${limit}`;

    if (offset) filters += ` OFFSET ${offset}`;

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

    const res = await query(psql, values);

    const mappedRes = res.rows.map((row) => {
      return row.json_build_object;
    });

    return mappedRes;
  }

  static async delete(id) {
    const psql = "DELETE FROM cohort WHERE id=$1 RETURNING *";

    const res = await query(psql, [id]);

    return res.rows[0];
  }
}

export default CohortDao;
