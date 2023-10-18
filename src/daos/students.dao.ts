import dataDB from "../repositories/dataDb.repository";
const { query } = dataDB;

class StudentDao {
  static async getCohortsStudents(conditions) {
    const { inscRole, ...cohortConditions } = conditions;
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
      ${
        Object.entries(cohortConditions).length ? "WHERE " + cohortFilters : ""
      } 
     GROUP BY user_commission."UserId"`;

    const res = await query(
      inscRole ? psqlUsers : psqlStudents,
      Object.values(cohortConditions)
    );

    return res.rows;
  }
}

export default StudentDao;
