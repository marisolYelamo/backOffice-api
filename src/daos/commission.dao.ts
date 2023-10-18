import dataDB from "../repositories/dataDb.repository";
const { query } = dataDB;
import createInsertQuery from "../utils/queryCreators/insertQueryCreator";
import createUpdateQuery from "../utils/queryCreators/updateQueryCreator";

class CommissionDao {
  static async create(commission) {
    const { psql, queryParams } = createInsertQuery(
      "commission",
      commission,
      true
    );

    const res = await query(psql, queryParams);
    const commissionCreated = res.rows[0];

    return commissionCreated;
  }

  static async get(field, value) {
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
    const res = await query(psql, [value]);

    if (!res.rows.length) return null;

    return res.rows[0];
  }

  static async update(id, commission) {
    const { psql, queryParams } = createUpdateQuery(
      "commission",
      id,
      commission
    );
    await query(psql, queryParams);
    return this.get("id", id);
  }

  static async delete(id) {
    const psql = "DELETE FROM commission WHERE id=$1 RETURNING *";

    const res = await query(psql, [id]);

    return res.rows[0];
  }

  static async addUserToCommission(id, userId) {
    const psql = `INSERT INTO user_commission ("UserId", "CommissionId") VALUES ($1, $2) `;
    const res = await query(psql, [userId, id]);

    return res;
  }

  static async removeUserFromCommission(id, userId) {
    const psql = `DELETE FROM user_commission WHERE "UserId"=$1 AND "CommissionId"=$2 `;

    const res = await query(psql, [userId, id]);

    return res;
  }

  static async getUserCommissions(userId) {
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

    const res = await query(psql, [userId]);

    return res.rows;
  }
}

export default CommissionDao;
