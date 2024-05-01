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
const cohort_service_1 = __importDefault(require("../services/cohort.service"));
const httpStatusCodes_1 = __importDefault(require("../utils/http/httpStatusCodes"));
const httpErrors_1 = require("../utils/http/httpErrors");
const checkAndHandleErros_1 = require("./utils/handleErros/checkAndHandleErros");
const apiResponses_1 = require("../utils/http/apiResponses");
class CohortController {
    static createCohort(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { label } = req.body;
                if (!label)
                    throw new httpErrors_1.Api400Error(`"label field is required`);
                const cohort = yield cohort_service_1.default.createCohort(Object.assign({}, req.body));
                res
                    .status(httpStatusCodes_1.default.CREATED)
                    .json((0, apiResponses_1.success)(200, "Cohort created successfully", cohort));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static getCohortsStudents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield cohort_service_1.default.getCohortsStudents(req.query);
                res.status(httpStatusCodes_1.default.OK).json((0, apiResponses_1.success)(200, "data found", students));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static getCohort(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const cohort = yield cohort_service_1.default.getCohort("id", id);
                res.status(httpStatusCodes_1.default.OK).json((0, apiResponses_1.success)(200, "data found", cohort));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static updateCohort(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const label = req.params.label;
            try {
                const cohort = yield cohort_service_1.default.updateCohort(label, req.body);
                res
                    .status(httpStatusCodes_1.default.OK)
                    .json((0, apiResponses_1.success)(200, `Cohort with label ${label} updated successfully.`, cohort));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static deleteCohort(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { label } = req.params;
            try {
                const resourcesToDelete = yield cohort_service_1.default.deleteCohort("label", label);
                res
                    .status(httpStatusCodes_1.default.OK)
                    .json((0, apiResponses_1.success)(204, `Cohort with label ${label} deleted successfully.`, resourcesToDelete));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static getAllCohorts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cohorts = yield cohort_service_1.default.getAllCohorts(req.query);
                res.status(httpStatusCodes_1.default.OK).json((0, apiResponses_1.success)(200, "data found", cohorts));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
}
exports.default = CohortController;
