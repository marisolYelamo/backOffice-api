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
const checkMissingParameters_1 = __importDefault(require("../utils/checkMissingParameters"));
const checkNotAllowedParameters_1 = __importDefault(require("../utils/checkNotAllowedParameters"));
const cohort_service_1 = __importDefault(require("../services/cohort.service"));
const commission_service_1 = __importDefault(require("../services/commission.service"));
const httpStatusCodes_1 = __importDefault(require("../utils/http/httpStatusCodes"));
const httpErrors_1 = require("../utils/http/httpErrors");
const checkAndHandleErros_1 = require("./utils/handleErros/checkAndHandleErros");
const apiResponses_1 = require("../utils/http/apiResponses");
const requiredAndAllowedParameters = ["name", "cohortId"];
class CommissionController {
    static createCommission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, checkMissingParameters_1.default)(req.body, requiredAndAllowedParameters);
                (0, checkNotAllowedParameters_1.default)(req.body, requiredAndAllowedParameters);
                const { cohortId } = req.body;
                if (cohortId)
                    yield cohort_service_1.default.getCohort("id", cohortId);
                const data = yield commission_service_1.default.createCommission(req.body);
                const message = "Commission created successfully.";
                res.status(httpStatusCodes_1.default.CREATED).json((0, apiResponses_1.success)(201, message, data));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static getCommission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const data = yield commission_service_1.default.getCommission("id", id);
                res.status(httpStatusCodes_1.default.OK).json((0, apiResponses_1.success)(200, "data found", data));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static updateCommission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const updatedCommission = yield commission_service_1.default.updateCommission(id, req.body);
                const message = `Commission with id ${id} updated successfully.`;
                res
                    .status(httpStatusCodes_1.default.OK)
                    .json((0, apiResponses_1.success)(204, message, updatedCommission));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static deleteCommission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const resourcesToDelete = yield commission_service_1.default.deleteCommission(id);
                const message = `Commission with id ${id} deleted successfully.`;
                res
                    .status(httpStatusCodes_1.default.OK)
                    .json((0, apiResponses_1.success)(204, message, resourcesToDelete));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static deleteUsersFromCommission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const requiredAndAllowedParameters = ["users"];
            try {
                (0, checkMissingParameters_1.default)(req.body, requiredAndAllowedParameters);
                (0, checkNotAllowedParameters_1.default)(req.body, requiredAndAllowedParameters);
                const { users } = req.body;
                users.forEach((userId) => {
                    if (typeof userId !== "number")
                        throw new httpErrors_1.Api400Error(`The "users" field in the req.body must contain users ids of type number.`);
                });
                const resourcesToDelete = yield commission_service_1.default.deleteUsersFromCommission(id, users);
                const message = `Users successfully removed from commission with id ${id}.`;
                res
                    .status(httpStatusCodes_1.default.OK)
                    .json((0, apiResponses_1.success)(204, message, resourcesToDelete));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static updateUsersCommission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const requiredAndAllowedParameters = ["users", "newCommission"];
            try {
                (0, checkMissingParameters_1.default)(req.body, requiredAndAllowedParameters);
                (0, checkNotAllowedParameters_1.default)(req.body, requiredAndAllowedParameters);
                const { users, newCommission } = req.body;
                users.forEach((userId) => {
                    if (typeof userId !== "number")
                        throw new httpErrors_1.Api400Error(`The "users" field in the req.body must contain users ids of type number.`);
                });
                const resourcesToUpdate = yield commission_service_1.default.updateUsersCommission(id, newCommission, users);
                const message = `Users successfully changed from commission with id ${id} to commission with id ${newCommission}.`;
                res
                    .status(httpStatusCodes_1.default.OK)
                    .json((0, apiResponses_1.success)(200, message, resourcesToUpdate));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static addUsersToCommission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const requiredAndAllowedParameters = ["users"];
            try {
                (0, checkMissingParameters_1.default)(req.body, requiredAndAllowedParameters);
                (0, checkNotAllowedParameters_1.default)(req.body, requiredAndAllowedParameters);
                const { users } = req.body;
                const resourcesToAdd = yield commission_service_1.default.enroleUsersToCommission(id, users);
                const message = `Users successfully added to commission with id ${id}.`;
                res
                    .status(httpStatusCodes_1.default.OK)
                    .json((0, apiResponses_1.success)(200, message, resourcesToAdd));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static getUserCommissions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const users = yield commission_service_1.default.getUserCommissions(id);
                const message = `User commissions found`;
                res.status(httpStatusCodes_1.default.OK).json((0, apiResponses_1.success)(200, message, users));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
}
exports.default = CommissionController;
