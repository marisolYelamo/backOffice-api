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
const role_service_1 = __importDefault(require("../services/role.service"));
const httpStatusCodes_1 = __importDefault(require("../utils/http/httpStatusCodes"));
const apiResponses_1 = require("../utils/http/apiResponses");
const checkAndHandleErros_1 = require("./utils/handleErros/checkAndHandleErros");
const { OK } = httpStatusCodes_1.default;
class RoleController {
    static getUserRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRole = yield role_service_1.default.getUserRole(req.user.id);
                console.log("USER ROLE IS", userRole);
                res.status(OK).json((0, apiResponses_1.success)(OK, "user roles found", userRole));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
    static getRoles(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield role_service_1.default.getRoles();
                res.status(OK).json((0, apiResponses_1.success)(OK, "Roles found", roles));
            }
            catch (error) {
                (0, checkAndHandleErros_1.checkAndHandleErrors)(error, next);
            }
        });
    }
}
exports.default = RoleController;
