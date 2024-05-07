import RoleDao from "../daos/role.dao";
import ServiceError from "./utils/serviceError";

class RoleService {
  static async getRole(id) {
    const data = await RoleDao.get("id", id);
    if (!data) throw new ServiceError("not_found", "role not found.");
    return data;
  }

  static async checkRole(id) {
    try {
      await this.getRole(id);
      return true;
    } catch (error) {
      if (error instanceof ServiceError) return false;
      throw error;
    }
  }

  static async bulkCheckRole(roles) {
    const promises = roles.map((role) => this.checkRole(role));

    const promisesResolved = await Promise.all(promises);

    if (promisesResolved.includes(false)) return false;

    return true;
  }

  static async getUserRole(userId) {
    const data = await RoleDao.getRolesToUser(userId);
    if (!data) throw new ServiceError("not_found", "user role not found.");
    return data;
  }

  static async getRoles() {
    const data = await RoleDao.getRoles();
    if (!data) throw new ServiceError("not_found", "Roles not found.");
    return data;
  }

  static async getUsersByRoles(roleId) {
    const data = await RoleDao.getUsersByRoles(roleId);
    if (!data)
      throw new ServiceError("not_found", "Users with this roles not found.");
    return data;
  }
}

export default RoleService;
