import dataDB from "../repositories/dataDb.repository";
const { query } = dataDB;

class RoleDao {
  static async get(field, value) {
    const psql = `SELECT id, name FROM roles WHERE ${field} = $1`;
    const res = await query(psql, [value]);
    return res.rows[0];
  }

  static async getRolesToUser(userId) {
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
    const res = await query(psql);
    return res.rows[0] ? res.rows[0].roles : [];
  }

  static async getRoles() {
    const psql = `SELECT * FROM roles`;
    const res = await query(psql);
    return res.rows;
  }

  static async getUsersByRoles(roleId) {
    const psql = `SELECT userRole."idUser", 
    json_agg(json_build_object(
    'id', users.id, 
    'email', users.email, 
    'role', roleUser.name)) 
    FROM users JOIN users_roles AS userRole ON userRole."idUser" = users.id 
    JOIN roles as roleUser ON userRole."idRole"= roleUser.id 
    WHERE userRole."idRole"=${roleId} 
    GROUP BY userRole."idUser"`;
    const res = await query(psql);
    return res.rows;
  }
}

export default RoleDao;
