import { ICohort } from "./cohort.interface";

export interface ICommission {
  readonly id: number;
  name: string;
  cohortId: number;
  discordRoleId?: string;
  discordChannelsIds: string[];
  cohort?: ICohort;
}

export type ICommissionKeys = keyof ICommission;
