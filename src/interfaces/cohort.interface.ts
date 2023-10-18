import { ICommission } from "./commission.interface";

export interface ICohort {
  readonly id: number;
  label: string;
  discordRoleId: string;
  discordChannelsIds: string[];
  commissions: ICommission[];
}

export type ICohortKeys = keyof ICohort;
