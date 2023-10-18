import dataDB from "../repositories/dataDb.repository";
const { query } = dataDB;

class ModuleDao {
  static async get(field, value) {
    const psql = `SELECT id, name FROM modules WHERE ${field} = $1`;
    const res = await query(psql, [value]);
    return res.rows[0];
  }
}

export default ModuleDao;
