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
const userRole_dao_1 = __importDefault(require("../daos/userRole.dao"));
const role_dao_1 = __importDefault(require("../daos/role.dao"));
class UserRoleService {
    static getUsersRoles(usersId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRoles = yield Promise.all(usersId.map((userId) => role_dao_1.default.getRolesToUser(userId)));
            return usersId.map((userId, i) => ({
                UserId: userId,
                roles: usersRoles[i],
            }));
        });
    }
    static updateUserRoles(userId, rolesIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userRole_dao_1.default.updateUserRoles(userId, rolesIds);
            return yield role_dao_1.default.getRolesToUser(userId);
        });
    }
}
exports.default = UserRoleService;
