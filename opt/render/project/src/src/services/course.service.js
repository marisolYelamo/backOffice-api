"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const randomIdGenerator_1 = __importDefault(require("../utils/randomIdGenerator"));
const course_dao_1 = __importDefault(require("../daos/course.dao"));
const serviceError_1 = __importDefault(require("./utils/serviceError"));
const typeOfCourse_service_1 = __importDefault(require("./typeOfCourse.service"));
const cohort_service_1 = __importDefault(require("./cohort.service"));
class CourseService {
    static addCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, year, month, shift } = course;
            const courseShift = shift ? shift : "fulltime";
            const cohortLabel = yield this.createCohortLabel(type, year, month, courseShift);
            const newCourse = yield course_dao_1.default.create(Object.assign(Object.assign({}, course), { cohortLabel }));
            yield cohort_service_1.default.createCohort({ label: cohortLabel });
            return newCourse;
        });
    }
    static updateCourse(prevCourseValues, course) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, year, month } = course;
            if (year || month || type) {
                const cohortLabel = yield this.updateCohortLabel(prevCourseValues.id, type, year, month, prevCourseValues.shift);
                yield cohort_service_1.default.updateCohort(prevCourseValues.cohortLabel, {
                    label: cohortLabel,
                });
            }
            yield course_dao_1.default.update(prevCourseValues.id, course);
            return this.getCourse(prevCourseValues.id);
        });
    }
    static getCourses(_page, _quantity, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            //WE DONT HAVE THE STRUCTURE IN CLIENT TO PAGINATE RESULT YET
            // const { limit, offset, currentPage } = pagination(page, quantity);
            const resCount = yield course_dao_1.default.countAll(filter);
            const courses = yield course_dao_1.default.getAll(null, null, filter);
            const totalItems = Number(resCount.rows[0].count);
            // const totalPages = Math.ceil(totalItems / limit);
            return {
                totalItems,
                //  totalPages,
                // currentPage,
                courses,
            };
        });
    }
    static getCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield course_dao_1.default.get("id", id);
            if (!course)
                throw new serviceError_1.default("not_found", `Course with id ${id} not found`);
            return course;
        });
    }
    static getCourseByCohortLabel(cohortLabel) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield course_dao_1.default.get(`"cohortLabel"`, cohortLabel);
            if (!course)
                throw new serviceError_1.default("not_found", `Course with cohortLabel ${cohortLabel} not found`);
            return course;
        });
    }
    static createCohortLabel(idType, year, month, shift) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tag } = yield typeOfCourse_service_1.default.getTypeOfCourse(idType);
            const id = (0, randomIdGenerator_1.default)(4);
            return `${tag}-${year}-${month}-${shift}-${id}`.toUpperCase();
        });
    }
    static updateCohortLabel(idCourse, newIdType, newYear, newMonth, shift) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.getCourse(idCourse);
            let tag = course.type.tag;
            const id = (0, randomIdGenerator_1.default)(4);
            const year = newYear === undefined ? course.year : newYear;
            const month = newMonth === undefined ? course.month : newMonth;
            if (typeof newIdType === "number") {
                const type = yield typeOfCourse_service_1.default.getTypeOfCourse(newIdType);
                tag = type.tag;
            }
            return `${tag}-${year}-${month}-${shift}-${id}`.toUpperCase();
        });
    }
    static deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.getCourse(id);
            const { channels, roles } = yield cohort_service_1.default.deleteCohort("label", course.cohortLabel);
            yield course_dao_1.default.delete(id);
            return { course, channels, roles };
        });
    }
}
exports.default = CourseService;
