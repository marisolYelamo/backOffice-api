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
const role_dao_1 = __importDefault(require("../daos/role.dao"));
const serviceError_1 = __importDefault(require("./utils/serviceError"));
class RoleService {
    static getRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield role_dao_1.default.get("id", id);
            if (!data)
                throw new serviceError_1.default("not_found", "role not found.");
            return data;
        });
    }
    static checkRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getRole(id);
                return true;
            }
            catch (error) {
                if (error instanceof serviceError_1.default)
                    return false;
                throw error;
            }
        });
    }
    static bulkCheckRole(roles) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = roles.map((role) => this.checkRole(role));
            const promisesResolved = yield Promise.all(promises);
            if (promisesResolved.includes(false))
                return false;
            return true;
        });
    }
    static getUserRole(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield role_dao_1.default.getRolesToUser(userId);
            if (!data)
                throw new serviceError_1.default("not_found", "user role not found.");
            return data;
        });
    }
    static getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield role_dao_1.default.getRoles();
            if (!data)
                throw new serviceError_1.default("not_found", "Roles not found.");
            return data;
        });
    }
}
exports.default = RoleService;
