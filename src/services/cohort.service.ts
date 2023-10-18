import { ICohort, ICohortKeys } from "../interfaces/cohort.interface";
import ServiceError from "./utils/serviceError";
import CohortDao from "../daos/cohort.dao";
import StudentDao from "../daos/students.dao";

class CohortService {
  public static async createCohort(cohort: Partial<ICohort>): Promise<ICohort> {
    const newCohort = await CohortDao.create(cohort);
    return newCohort;
  }

  public static async getCohortsStudents(filters: {
    [key: string]: any;
  }): Promise<number[]> {
    const students = await StudentDao.getCohortsStudents(filters);
    return students.map((student) => ({
      ...student,
      roles: student.roles || [],
    }));
  }

  public static async getCohort(
    field: keyof ICohort,
    value: ICohort[ICohortKeys]
  ): Promise<ICohort> {
    const cohort = await CohortDao.get(field, value);

    if (!cohort)
      throw new ServiceError(
        "not_found",
        `Cohort with ${String(field)} ${value} not found.`
      );

    return cohort;
  }

  public static async updateCohort(
    label: ICohort["label"],
    data: Partial<ICohort>
  ): Promise<void> {
    const cohort = await this.getCohort("label", label); //Get one by label
    const updatedCohort = await CohortDao.update(cohort.id, data);
    return updatedCohort;
  }

  public static async deleteCohort(
    field: "id" | "label",
    value: ICohort["id"] | ICohort["label"]
  ) {
    const cohort = await this.getCohort(field, value);

    let channels: string[] = cohort.discordChannelsIds;
    const roles: string[] = [cohort.discordRoleId];

    cohort.commissions.forEach((commission) => {
      channels = channels.concat(commission.discordChannelsIds);
      if (commission.discordRoleId) roles.push(commission.discordRoleId);
    });

    await CohortDao.delete(cohort.id); //Delete in cohort dao

    return {
      channels,
      roles,
    };
  }

  public static async getAllCohorts(query: {
    [key: string]: any;
  }): Promise<ICohort[]> {
    let condition: { [key: string]: any } | undefined = undefined;
    const keys = Object.keys(query);

    if (keys.length > 0) condition = query;

    const res = await CohortDao.getAll(null, null, condition);

    return res;
  }
}

export default CohortService;
