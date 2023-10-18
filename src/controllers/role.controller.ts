import RoleService from "../services/role.service";
import httpStatusCodes from "../utils/http/httpStatusCodes";
import { success } from "../utils/http/apiResponses";
import { checkAndHandleErrors } from "./utils/handleErros/checkAndHandleErros";
import { NextFunction, Request, Response } from "express";

const { OK } = httpStatusCodes;

class RoleController {
  static async getUserRole(req, res, next) {
    try {
      const userRole = await RoleService.getUserRole(req.user.id);
      console.log("USER ROLE IS", userRole);
      res.status(OK).json(success(OK, "user roles found", userRole));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  static async getRoles(_req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await RoleService.getRoles();
      res.status(OK).json(success(OK, "Roles found", roles));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }
}

export default RoleController;
