import { NextFunction, Request, Response } from "express";
import checkMissingParameters from "../utils/checkMissingParameters";
import checkNotAllowedParameters from "../utils/checkNotAllowedParameters";
import CohortService from "../services/cohort.service";
import CommissionService from "../services/commission.service";
import httpStatusCodes from "../utils/http/httpStatusCodes";
import { Api400Error } from "../utils/http/httpErrors";
import { checkAndHandleErrors } from "./utils/handleErros/checkAndHandleErros";
import { success } from "../utils/http/apiResponses";

const requiredAndAllowedParameters = ["name", "cohortId"];

class CommissionController {
  public static async createCommission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      checkMissingParameters(req.body, requiredAndAllowedParameters);
      checkNotAllowedParameters(req.body, requiredAndAllowedParameters);

      const { cohortId } = req.body;
      if (cohortId) await CohortService.getCohort("id", cohortId);

      const data = await CommissionService.createCommission(req.body);
      const message = "Commission created successfully.";

      res.status(httpStatusCodes.CREATED).json(success(201, message, data));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async getCommission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const id = Number(req.params.id);
    try {
      const data = await CommissionService.getCommission("id", id);

      res.status(httpStatusCodes.OK).json(success(200, "data found", data));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async updateCommission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const id = Number(req.params.id);

    try {
      const updatedCommission = await CommissionService.updateCommission(
        id,
        req.body
      );
      const message = `Commission with id ${id} updated successfully.`;

      res
        .status(httpStatusCodes.OK)
        .json(success(204, message, updatedCommission));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async deleteCommission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const id = Number(req.params.id);

    try {
      const resourcesToDelete = await CommissionService.deleteCommission(id);
      const message = `Commission with id ${id} deleted successfully.`;

      res
        .status(httpStatusCodes.OK)
        .json(success(204, message, resourcesToDelete));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async deleteUsersFromCommission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const id = Number(req.params.id);
    const requiredAndAllowedParameters = ["users"];

    try {
      console.log("REQ", req.body.users, req.body["users"]);
      checkMissingParameters(req.body, requiredAndAllowedParameters);
      checkNotAllowedParameters(req.body, requiredAndAllowedParameters);

      const { users } = req.body;
      users.forEach((userId: any) => {
        if (typeof userId !== "number")
          throw new Api400Error(
            `The "users" field in the req.body must contain users ids of type number.`
          );
      });

      const resourcesToDelete =
        await CommissionService.deleteUsersFromCommission(id, users);

      const message = `Users successfully removed from commission with id ${id}.`;
      res
        .status(httpStatusCodes.OK)
        .json(success(204, message, resourcesToDelete));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async updateUsersCommission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const id = Number(req.params.id);
    const requiredAndAllowedParameters = ["users", "newCommission"];

    try {
      checkMissingParameters(req.body, requiredAndAllowedParameters);
      checkNotAllowedParameters(req.body, requiredAndAllowedParameters);

      const { users, newCommission } = req.body;
      users.forEach((userId: any) => {
        if (typeof userId !== "number")
          throw new Api400Error(
            `The "users" field in the req.body must contain users ids of type number.`
          );
      });

      const resourcesToUpdate = await CommissionService.updateUsersCommission(
        id,
        newCommission,
        users
      );

      const message = `Users successfully changed from commission with id ${id} to commission with id ${newCommission}.`;
      res
        .status(httpStatusCodes.OK)
        .json(success(200, message, resourcesToUpdate));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async addUsersToCommission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const id = Number(req.params.id);
    const requiredAndAllowedParameters = ["users"];

    try {
      checkMissingParameters(req.body, requiredAndAllowedParameters);
      checkNotAllowedParameters(req.body, requiredAndAllowedParameters);

      const { users } = req.body;

      const resourcesToAdd = await CommissionService.enroleUsersToCommission(
        id,
        users
      );

      const message = `Users successfully added to commission with id ${id}.`;
      res
        .status(httpStatusCodes.OK)
        .json(success(200, message, resourcesToAdd));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async getUserCommissions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const id = Number(req.params.id);

    try {
      const users = await CommissionService.getUserCommissions(id);

      const message = `User commissions found`;
      res.status(httpStatusCodes.OK).json(success(200, message, users));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }
}

export default CommissionController;
