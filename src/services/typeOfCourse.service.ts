import ServiceError from "./utils/serviceError";
import TypeOfCourseDao from "../daos/typeOfCourse.dao";

class TypeOfCourseService {
  static async addTypeOfCourse(typeOfCourse) {
    await TypeOfCourseDao.create(typeOfCourse);

    return this.getTypeOfCourseByTag(typeOfCourse.tag);
  }

  static async getAllTypesOfCourse() {
    const typesOfCourses = await TypeOfCourseDao.getAll();
    return typesOfCourses;
  }

  static async getTypeOfCourse(id) {
    const res = await TypeOfCourseDao.get("id", id);
    const typeOfCourse = res.rows[0];
    if (!typeOfCourse)
      throw new ServiceError(
        "not_found",
        `Type of Course with id ${id} not found`
      );
    return typeOfCourse;
  }

  static async getTypeOfCourseByTag(tag) {
    const res = await TypeOfCourseDao.get("tag", tag);
    const typeOfCourse = res.rows[0];
    if (!typeOfCourse)
      throw new ServiceError(
        "not_found",
        `Type of Course with tag ${tag} not found`
      );
    return typeOfCourse;
  }
}

export default TypeOfCourseService;
