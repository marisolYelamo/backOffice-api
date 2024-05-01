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
const module_dao_1 = __importDefault(require("../daos/module.dao"));
const serviceError_1 = __importDefault(require("./utils/serviceError"));
class ModuleService {
    static getModule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield module_dao_1.default.get("id", id);
            if (!data)
                throw new serviceError_1.default("not_found", "Module not found.");
            return data;
        });
    }
    static checkModule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getModule(id);
                return true;
            }
            catch (error) {
                if (error instanceof serviceError_1.default)
                    return false;
                throw error;
            }
        });
    }
    static bulkCheckModule(roles) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = roles.map((role) => this.checkModule(role));
            const promisesResolved = yield Promise.all(promises);
            if (promisesResolved.includes(false))
                return false;
            return true;
        });
    }
}
exports.default = ModuleService;
