import TypeOfCourseService from "../services/typeOfCourse.service";

import { success } from "../utils/http/apiResponses";
import httpStatusCodes from "../utils/http/httpStatusCodes";
import checkMissingParameters from "../utils/checkMissingParameters";
import checkNotAllowedParameters from "../utils/checkNotAllowedParameters";
import { checkAndHandleErrors } from "./utils/handleErros/checkAndHandleErros";

const { CREATED, OK } = httpStatusCodes;

class TypeOfCourseController {
  static async addTypeOfCourse(req, res, next) {
    const requiredAndAllowedParameters = ["name", "tag"];

    try {
      checkMissingParameters(req.body, requiredAndAllowedParameters);
      checkNotAllowedParameters(req.body, requiredAndAllowedParameters);

      const course = await TypeOfCourseService.addTypeOfCourse(req.body);

      res
        .status(CREATED)
        .json(success(CREATED, "Type Of Course created.", course));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  static async getTypesOfCourses(_req, res, next) {
    try {
      const typesOfCourse = await TypeOfCourseService.getAllTypesOfCourse();

      res.status(OK).json(success(OK, "Types Of Course found.", typesOfCourse));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }
}

export default TypeOfCourseController;
