import randomIdGenerator from "../utils/randomIdGenerator";
import CourseDao from "../daos/course.dao";
import ServiceError from "./utils/serviceError";
import TypesOfCoursesService from "./typeOfCourse.service";
import CohortService from "./cohort.service";

class CourseService {
  static async addCourse(course) {
    const { type, year, month, shift } = course;
    const courseShift = shift ? shift : "fulltime";

    const cohortLabel = await this.createCohortLabel(
      type,
      year,
      month,
      courseShift
    );

    const newCourse = await CourseDao.create({
      ...course,
      cohortLabel,
    });

    await CohortService.createCohort({ label: cohortLabel });

    return newCourse;
  }

  static async updateCourse(prevCourseValues, course) {
    const { type, year, month } = course;

    if (year || month || type) {
      const cohortLabel = await this.updateCohortLabel(
        prevCourseValues.id,
        type,
        year,
        month,
        prevCourseValues.shift
      );

      await CohortService.updateCohort(prevCourseValues.cohortLabel, {
        label: cohortLabel,
      });
    }

    await CourseDao.update(prevCourseValues.id, course);

    return this.getCourse(prevCourseValues.id);
  }

  static async getCourses(_page, _quantity, filter) {
    //WE DONT HAVE THE STRUCTURE IN CLIENT TO PAGINATE RESULT YET
    // const { limit, offset, currentPage } = pagination(page, quantity);
    const resCount = await CourseDao.countAll(filter);
    const courses = await CourseDao.getAll(null, null, filter);
    const totalItems = Number(resCount.rows[0].count);
    // const totalPages = Math.ceil(totalItems / limit);

    return {
      totalItems,
      //  totalPages,
      // currentPage,
      courses,
    };
  }

  static async getCourse(id) {
    const course = await CourseDao.get("id", id);

    if (!course)
      throw new ServiceError("not_found", `Course with id ${id} not found`);

    return course;
  }

  static async getCourseByCohortLabel(cohortLabel) {
    const course = await CourseDao.get(`"cohortLabel"`, cohortLabel);

    if (!course)
      throw new ServiceError(
        "not_found",
        `Course with cohortLabel ${cohortLabel} not found`
      );

    return course;
  }

  static async createCohortLabel(idType, year, month, shift) {
    const { tag } = await TypesOfCoursesService.getTypeOfCourse(idType);
    const id = randomIdGenerator(4);

    return `${tag}-${year}-${month}-${shift}-${id}`.toUpperCase();
  }

  static async updateCohortLabel(
    idCourse,
    newIdType,
    newYear,
    newMonth,
    shift
  ) {
    const course = await this.getCourse(idCourse);

    let tag = course.type.tag;
    const id = randomIdGenerator(4);
    const year = newYear === undefined ? course.year : newYear;
    const month = newMonth === undefined ? course.month : newMonth;

    if (typeof newIdType === "number") {
      const type = await TypesOfCoursesService.getTypeOfCourse(newIdType);
      tag = type.tag;
    }

    return `${tag}-${year}-${month}-${shift}-${id}`.toUpperCase();
  }

  static async deleteCourse(id) {
    const course = await this.getCourse(id);
    const { channels, roles } = await CohortService.deleteCohort(
      "label",
      course.cohortLabel
    );
    await CourseDao.delete(id);

    return { course, channels, roles };
  }
}

export default CourseService;
