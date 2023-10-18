import ModuleDao from "../daos/module.dao";
import ServiceError from "./utils/serviceError";

class ModuleService {
  static async getModule(id) {
    const data = await ModuleDao.get("id", id);
    if (!data) throw new ServiceError("not_found", "Module not found.");
    return data;
  }

  static async checkModule(id) {
    try {
      await this.getModule(id);
      return true;
    } catch (error) {
      if (error instanceof ServiceError) return false;
      throw error;
    }
  }

  static async bulkCheckModule(roles) {
    const promises = roles.map((role) => this.checkModule(role));

    const promisesResolved = await Promise.all(promises);

    if (promisesResolved.includes(false)) return false;

    return true;
  }
}

export default ModuleService;
