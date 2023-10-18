import { NextFunction, Request, Response } from "express";
import CohortService from "../services/cohort.service";
import httpStatusCodes from "../utils/http/httpStatusCodes";
import { Api400Error } from "../utils/http/httpErrors";
import { checkAndHandleErrors } from "./utils/handleErros/checkAndHandleErros";
import { success } from "../utils/http/apiResponses";

class CohortController {
  public static async createCohort(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { label } = req.body;
      if (!label) throw new Api400Error(`"label field is required`);

      const cohort = await CohortService.createCohort({
        ...req.body,
      });

      res
        .status(httpStatusCodes.CREATED)
        .json(success(200, "Cohort created successfully", cohort));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async getCohortsStudents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const students = await CohortService.getCohortsStudents(req.query);
      res.status(httpStatusCodes.OK).json(success(200, "data found", students));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async getCohort(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const id = Number(req.params.id);
    try {
      const cohort = await CohortService.getCohort("id", id);
      res.status(httpStatusCodes.OK).json(success(200, "data found", cohort));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async updateCohort(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const label = req.params.label;

    try {
      const cohort = await CohortService.updateCohort(label, req.body);

      res
        .status(httpStatusCodes.OK)
        .json(
          success(
            200,
            `Cohort with label ${label} updated successfully.`,
            cohort
          )
        );
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async deleteCohort(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { label } = req.params;

    try {
      const resourcesToDelete = await CohortService.deleteCohort(
        "label",
        label
      );

      res
        .status(httpStatusCodes.OK)
        .json(
          success(
            204,
            `Cohort with label ${label} deleted successfully.`,
            resourcesToDelete
          )
        );
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  public static async getAllCohorts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const cohorts = await CohortService.getAllCohorts(req.query);
      res.status(httpStatusCodes.OK).json(success(200, "data found", cohorts));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }
}

export default CohortController;
