import {
  ICommission,
  ICommissionKeys,
} from "../interfaces/commission.interface";
import CohortService from "./cohort.service";
import ServiceError from "./utils/serviceError";
import CommissionDao from "../daos/commission.dao";
import { ICohort } from "../interfaces/cohort.interface";

class CommissionService {
  public static async createCommission(
    commission: Pick<ICommission, "name" | "cohortId">
  ): Promise<{ cohort: ICohort; commission: ICommission }> {
    const cohort = await CohortService.getCohort("id", commission.cohortId);
    const newCommission = await CommissionDao.create(commission); // Commission dao to create
    return { cohort, commission: newCommission };
  }

  public static async getCommission(
    field: keyof ICommission,
    value: ICommission[ICommissionKeys]
  ): Promise<ICommission> {
    if (!value) throw TypeError("Commission query value can't be undefined");
    const commission = await CommissionDao.get(field, value);

    if (!commission)
      throw new ServiceError(
        "not_found",
        `Commission with ${field} ${value} not found.`
      );

    return commission;
  }

  public static async deleteCommission(id: ICommission["id"]) {
    const commission = await this.getCommission("id", id);

    await CommissionDao.delete(id);

    return {
      discordChannels: commission.discordChannelsIds,
      discordRole: commission.discordRoleId,
    };
  }

  public static async updateCommission(
    id: ICommission["id"],
    body: Partial<ICommission>
  ) {
    await this.getCommission("id", id);

    const updatedCommission = await CommissionDao.update(id, body);

    return updatedCommission;
  }

  public static async enroleUsersToCommission(
    id: ICommission["id"],
    users: number[]
  ) {
    await Promise.all(
      users.map(async (userId) => {
        await CommissionDao.addUserToCommission(id, userId);
      })
    );

    const updatedCommission = await this.getCommission("id", id);

    return updatedCommission;
  }

  public static async deleteUsersFromCommission(
    id: ICommission["id"],
    users: number[]
  ) {
    await Promise.all(
      users.map(async (userId) => {
        await CommissionDao.removeUserFromCommission(id, userId);
      })
    );

    const updatedCommission: ICommission = await this.getCommission("id", id);

    return updatedCommission;
  }

  public static async getUserCommissions(id: number) {
    const users = CommissionDao.getUserCommissions(id);
    return users;
  }

  public static async updateUsersCommission(
    id: ICommission["id"],
    newCommisionId: ICommission["id"],
    users: number[]
  ) {
    await Promise.all(
      users.map(async (userId) => {
        const dataBasePromises: any[] = [];

        dataBasePromises.push(
          CommissionDao.removeUserFromCommission(id, userId)
        ); //update daos
        dataBasePromises.push(
          CommissionDao.addUserToCommission(newCommisionId, userId)
        );

        await Promise.all(dataBasePromises);
      })
    );

    const [commission, newCommission] = await Promise.all([
      this.getCommission("id", id),
      this.getCommission("id", newCommisionId),
    ]);

    return {
      oldCommission: commission,
      newCommission,
    };
  }
}

export default CommissionService;
