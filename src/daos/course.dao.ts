import courseMapper from "./mappers/course.mapper";
import createInsertQuery from "../utils/queryCreators/insertQueryCreator";
import createUpdateQuery from "../utils/queryCreators/updateQueryCreator";
import dataDB from "../repositories/dataDb.repository";
const { query } = dataDB;

class CourseDao {
  static async create(course) {
    const { psql, queryParams } = createInsertQuery("Courses", course, true);

    const res = await query(psql, queryParams);
    const courseCreated = res.rows[0];

    /** CREATE COHORT EN PLEDU */

    return this.get("id", courseCreated.id);
  }

  static async get(field, value) {
    const queryField = field === "id" ? "C.id" : field;
    const psql = `SELECT *, C.id as id, TC.id as type FROM Courses as C
    INNER JOIN "typesOfCourses" as TC ON C.type = TC.id
    WHERE ${queryField} = $1`;
    const res = await query(psql, [value]);

    if (!res.rows.length) return null;

    return courseMapper(res.rows[0]);
  }

  static update(id, course) {
    const { psql, queryParams } = createUpdateQuery("Courses", id, course);
    return query(psql, queryParams);
  }

  static async getAll(offset, limit, condition) {
    let psql = `SELECT *, C.id as id, TC.id as type FROM Courses as C
    INNER JOIN "typesOfCourses" as TC ON C.type = TC.id `;
    const values: string[] = [];
    const keys = Object.keys(condition);

    if (keys.length) {
      psql += " WHERE ";

      keys.forEach((key, i) => {
        values.push(condition[key]);
        if (key === "cohortLabel")
          psql += `C."cohortLabel" ILIKE '%'||$${i + 1}||'%' `;
        else psql += `"${key}" = $${i + 1} `;
        if (i !== keys.length - 1) psql += "AND ";
      });
    }

    if (limit) psql += ` LIMIT ${limit}`;

    if (offset) psql += ` OFFSET ${offset}`;

    psql += `ORDER BY C."startDate" ASC`;

    const res = await query(psql, values);

    return res.rows.map((c) => courseMapper(c));
  }

  static countAll(condition) {
    let psql = "SELECT COUNT (*) FROM Courses";
    const values: string[] = [];
    const keys = Object.keys(condition);

    if (keys.length) {
      psql += " WHERE ";

      keys.forEach((key, i) => {
        values.push(condition[key]);
        psql += `"${key}" = $${i + 1} `;
        if (i !== keys.length - 1) psql += "AND ";
      });
    }

    return query(psql, values);
  }

  static async delete(id) {
    const psql = "DELETE FROM Courses WHERE id=$1 RETURNING *";

    const res = await query(psql, [id]);

    return res.rows[0];
  }
}

export default CourseDao;
