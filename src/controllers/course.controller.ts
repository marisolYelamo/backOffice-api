import CourseService from "../services/course.service";

import httpStatusCodes from "../utils/http/httpStatusCodes";
import { success } from "../utils/http/apiResponses";
import checkMissingParameters from "../utils/checkMissingParameters";
import checkNotAllowedParameters from "../utils/checkNotAllowedParameters";
import { checkAndHandleErrors } from "./utils/handleErros/checkAndHandleErros";

const { OK, CREATED } = httpStatusCodes;

const allAllowedParameters = [
  "type",
  "year",
  "month",
  "mode",
  "startDate",
  "endDate",
  "startHour",
  "endHour",
  "weekDays",
  "limitToApply",
  "limitOfStudents",
  "priceARS",
  "priceUSD",
  "availability",
  "status",
  "visibility",
  "shift",
  "bootcampPreparation",
  "alliance",
  "vacancyStatus",
  "partTimeStartDate",
  "partTimeEndDate",
];
class CourseController {
  static async addCourse(req, res, next) {
    const requiredParameters = [
      "type",
      "year",
      "month",
      "mode",
      "startDate",
      "endDate",
      "startHour",
      "endHour",
      "weekDays",
      "limitToApply",
      "limitOfStudents",
      "priceARS",
      "priceUSD",
    ];

    try {
      checkMissingParameters(req.body, requiredParameters);
      checkNotAllowedParameters(req.body, allAllowedParameters);

      const course = await CourseService.addCourse(req.body);

      res.status(CREATED).json(success(CREATED, "Course created.", course));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  static async getCourses(req, res, next) {
    const { page, limit, ...conditions } = req.query;

    try {
      const courses = await CourseService.getCourses(page, limit, conditions);

      res.status(OK).json(success(OK, "Courses found.", courses));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  static async getCourse(req, res, next) {
    const id = req.params.id;
    try {
      const courseFounded = await CourseService.getCourse(id);
      res.status(OK).json(success(OK, "Course found.", courseFounded));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  static async updateCourse(req, res, next) {
    const id = req.params.id;

    try {
      checkNotAllowedParameters(req.body, allAllowedParameters);

      const existingCourse = await CourseService.getCourse(id);

      const course = await CourseService.updateCourse(existingCourse, req.body);

      res.status(OK).json(success(OK, "Course updated.", course));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }

  static async deleteCourse(req, res, next) {
    const id = req.params.id;

    try {
      const course = await CourseService.deleteCourse(id);

      res.status(OK).json(success(OK, "Course deleted successfuly.", course));
    } catch (error) {
      checkAndHandleErrors(error, next);
    }
  }
}

export default CourseController;
