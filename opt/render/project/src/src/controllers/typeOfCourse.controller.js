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
const typeOfCourse_service_1 = __importDefault(require("../services/typeOfCourse.service"));
const apiResponses_1 = require("../utils/http/apiResponses");
const httpStatusCodes_1 = __importDefault(require("../utils/http/httpStatusCodes"));
const checkMissingParameters_1 = __importDefault(require("../utils/checkMissingParameters"));
const checkNotAllowedParameters_1 = __importDefault(require("../utils/checkNotAllowedParameters"));
const checkAndHandleErros_1 = require("./utils/handleErros/checkAndHandleErros");
const { CREATED, OK } = httpStatusCodes_1.default;
class TypeOfCourseController {
    static addTypeOfCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredAndAllowedParameters = ["name", "tag"];
            try {
                (0, checkMissingParameters_1.default)(req.body, requiredAndAllowedParameters);
                (0, checkNotAllowedParameters_1.default)(req.body, requiredAndAllowedParameters);
                const course = yield typeOfCourse_service_1.default.addTypeOfCourse(req.body);
                res
                    .status(CREATED)
                    .json((0, apiResponses_1.success)(CREATED, "Type Of Course created.", course));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static getTypesOfCourses(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const typesOfCourse = yield typeOfCourse_service_1.default.getAllTypesOfCourse();
                res.status(OK).json((0, apiResponses_1.success)(OK, "Types Of Course found.", typesOfCourse));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
}
exports.default = TypeOfCourseController;
