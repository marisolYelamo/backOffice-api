import userRoleDao from "../daos/userRole.dao";
import RoleDao from "../daos/role.dao";

class UserRoleService {
  static async getUsersRoles(usersId: number[]) {
    const usersRoles = await Promise.all(
      usersId.map((userId) => RoleDao.getRolesToUser(userId))
    );
    return usersId.map((userId, i) => ({
      UserId: userId,
      roles: usersRoles[i],
    }));
  }

  static async updateUserRoles(userId: number, rolesIds: number[]) {
    await userRoleDao.updateUserRoles(userId, rolesIds);

    return await RoleDao.getRolesToUser(userId);
  }
}

export default UserRoleService;
