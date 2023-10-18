import UserService from "../services/userRole.service";
import httpStatusCodes from "../utils/http/httpStatusCodes";

import { success } from "../utils/http/apiResponses";

import { Api400Error } from "../utils/http/httpErrors";
import { checkAndHandleErrors } from "./utils/handleErros/checkAndHandleErros";

import checkMissingParameters from "../utils/checkMissingParameters";
import { NextFunction, Request, Response } from "express";

const { OK } = httpStatusCodes;

class UserController {
  static async getUsersRoles(req, res, next) {
    try {
      checkMissingParameters(req.query, ["usersId"]);
      const { usersId: usersIdQuery } = req.query;
      const usersId = usersIdQuery.split(",").map((userId) => Number(userId));

      if (!usersId.every((id) => id === +id))
        throw new Api400Error("The ids passed by parameters must be numbers");

      const userRole = await UserService.getUsersRoles(usersId);
      res.status(OK).json(success(OK, "users roles found", userRole));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  static async updateUserRoles(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      checkMissingParameters(req.body, ["rolesIds"]);
      const { rolesIds } = req.body;
      const userId = Number(req.params.id);

      if (!rolesIds.every((id) => id === +id))
        throw new Api400Error("The ids passed by parameters must be numbers");

      const updatedResult = await UserService.updateUserRoles(userId, rolesIds);

      res
        .status(OK)
        .json(success(OK, "Users roles updated successfully", updatedResult));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }
}

export default UserController;
