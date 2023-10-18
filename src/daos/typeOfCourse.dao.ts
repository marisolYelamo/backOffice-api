import dataDB from "../repositories/dataDb.repository";
const { query } = dataDB;

class TypeOfCourseDao {
  static create(typeOfCourse) {
    const { name, tag } = typeOfCourse;
    const typeOfCourseValues = [name, tag];

    const psql = `INSERT INTO "typesOfCourses" (name, tag) VALUES ($1, $2)`;

    return query(psql, typeOfCourseValues);
  }

  static get(field, value) {
    const psql = `SELECT * FROM "typesOfCourses" WHERE ${field} = $1`;
    return query(psql, [value]);
  }

  static async getAll() {
    const psql = `SELECT * FROM "typesOfCourses"`;
    const res = await query(psql);
    return res.rows;
  }
}

export default TypeOfCourseDao;
