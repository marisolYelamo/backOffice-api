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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_service_1 = __importDefault(require("../services/course.service"));
const httpStatusCodes_1 = __importDefault(require("../utils/http/httpStatusCodes"));
const apiResponses_1 = require("../utils/http/apiResponses");
const checkMissingParameters_1 = __importDefault(require("../utils/checkMissingParameters"));
const checkNotAllowedParameters_1 = __importDefault(require("../utils/checkNotAllowedParameters"));
const checkAndHandleErros_1 = require("./utils/handleErros/checkAndHandleErros");
const { OK, CREATED } = httpStatusCodes_1.default;
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
    static addCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                (0, checkMissingParameters_1.default)(req.body, requiredParameters);
                (0, checkNotAllowedParameters_1.default)(req.body, allAllowedParameters);
                const course = yield course_service_1.default.addCourse(req.body);
                res.status(CREATED).json((0, apiResponses_1.success)(CREATED, "Course created.", course));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static getCourses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = req.query, { page, limit } = _a, conditions = __rest(_a, ["page", "limit"]);
            try {
                const courses = yield course_service_1.default.getCourses(page, limit, conditions);
                res.status(OK).json((0, apiResponses_1.success)(OK, "Courses found.", courses));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static getCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const courseFounded = yield course_service_1.default.getCourse(id);
                res.status(OK).json((0, apiResponses_1.success)(OK, "Course found.", courseFounded));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static updateCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                (0, checkNotAllowedParameters_1.default)(req.body, allAllowedParameters);
                const existingCourse = yield course_service_1.default.getCourse(id);
                const course = yield course_service_1.default.updateCourse(existingCourse, req.body);
                res.status(OK).json((0, apiResponses_1.success)(OK, "Course updated.", course));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static deleteCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const course = yield course_service_1.default.deleteCourse(id);
                res.status(OK).json((0, apiResponses_1.success)(OK, "Course deleted successfuly.", course));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
}
exports.default = CourseController;
