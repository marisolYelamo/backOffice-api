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
const userRole_service_1 = __importDefault(require("../services/userRole.service"));
const httpStatusCodes_1 = __importDefault(require("../utils/http/httpStatusCodes"));
const apiResponses_1 = require("../utils/http/apiResponses");
const httpErrors_1 = require("../utils/http/httpErrors");
const checkAndHandleErros_1 = require("./utils/handleErros/checkAndHandleErros");
const checkMissingParameters_1 = __importDefault(require("../utils/checkMissingParameters"));
const { OK } = httpStatusCodes_1.default;
class UserController {
    static getUsersRoles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, checkMissingParameters_1.default)(req.query, ["usersId"]);
                const { usersId: usersIdQuery } = req.query;
                const usersId = usersIdQuery.split(",").map((userId) => Number(userId));
                if (!usersId.every((id) => id === +id))
                    throw new httpErrors_1.Api400Error("The ids passed by parameters must be numbers");
                const userRole = yield userRole_service_1.default.getUsersRoles(usersId);
                res.status(OK).json((0, apiResponses_1.success)(OK, "users roles found", userRole));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static updateUserRoles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, checkMissingParameters_1.default)(req.body, ["rolesIds"]);
                const { rolesIds } = req.body;
                const userId = Number(req.params.id);
                if (!rolesIds.every((id) => id === +id))
                    throw new httpErrors_1.Api400Error("The ids passed by parameters must be numbers");
                const updatedResult = yield userRole_service_1.default.updateUserRoles(userId, rolesIds);
                res
                    .status(OK)
                    .json((0, apiResponses_1.success)(OK, "Users roles updated successfully", updatedResult));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
}
exports.default = UserController;
