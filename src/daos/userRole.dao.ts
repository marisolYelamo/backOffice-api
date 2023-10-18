import dataDB from "../repositories/dataDb.repository";
const { query } = dataDB;
//needs ts

class userRoleDao {
  static async updateUserRoles(userId: number, rolesIds: number[]) {
    const values = [userId, ...rolesIds];

    if (!rolesIds.length) {
      const psql = `
      DELETE FROM users_roles WHERE "idUser" = $1;
      `;

      return await query(psql, [userId]);
    }

    let transactionSql = `
    START TRANSACTION;
    `;

    await query(transactionSql);

    const deleteSql = `
    DELETE FROM users_roles WHERE "idUser" = $1;
    `;

    await query(deleteSql, [userId]);

    let insertSql = `INSERT INTO users_roles ("idUser", "idModule", "idRole")
    VALUES`;

    rolesIds.forEach((_role, i) => {
      insertSql +=
        i !== rolesIds.length - 1
          ? `($1, 1, $${i + 2}), `
          : `($1, 1, $${i + 2})`;
    });

    const res = await query(insertSql, values);

    transactionSql = `
    COMMIT;
  `;

    await query(transactionSql);
    return res.rows;
  }
}

export default userRoleDao;
