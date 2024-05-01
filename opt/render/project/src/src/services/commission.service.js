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
const cohort_service_1 = __importDefault(require("./cohort.service"));
const serviceError_1 = __importDefault(require("./utils/serviceError"));
const commission_dao_1 = __importDefault(require("../daos/commission.dao"));
class CommissionService {
    static createCommission(commission) {
        return __awaiter(this, void 0, void 0, function* () {
            const cohort = yield cohort_service_1.default.getCohort("id", commission.cohortId);
            const newCommission = yield commission_dao_1.default.create(commission); // Commission dao to create
            return { cohort, commission: newCommission };
        });
    }
    static getCommission(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!value)
                throw TypeError("Commission query value can't be undefined");
            const commission = yield commission_dao_1.default.get(field, value);
            if (!commission)
                throw new serviceError_1.default("not_found", `Commission with ${field} ${value} not found.`);
            return commission;
        });
    }
    static deleteCommission(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const commission = yield this.getCommission("id", id);
            yield commission_dao_1.default.delete(id);
            return {
                discordChannels: commission.discordChannelsIds,
                discordRole: commission.discordRoleId,
            };
        });
    }
    static updateCommission(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getCommission("id", id);
            const updatedCommission = yield commission_dao_1.default.update(id, body);
            return updatedCommission;
        });
    }
    static enroleUsersToCommission(id, users) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(users.map((userId) => __awaiter(this, void 0, void 0, function* () {
                yield commission_dao_1.default.addUserToCommission(id, userId);
            })));
            const updatedCommission = yield this.getCommission("id", id);
            return updatedCommission;
        });
    }
    static deleteUsersFromCommission(id, users) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(users.map((userId) => __awaiter(this, void 0, void 0, function* () {
                yield commission_dao_1.default.removeUserFromCommission(id, userId);
            })));
            const updatedCommission = yield this.getCommission("id", id);
            return updatedCommission;
        });
    }
    static getUserCommissions(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = commission_dao_1.default.getUserCommissions(id);
            return users;
        });
    }
    static updateUsersCommission(id, newCommisionId, users) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(users.map((userId) => __awaiter(this, void 0, void 0, function* () {
                const dataBasePromises = [];
                dataBasePromises.push(commission_dao_1.default.removeUserFromCommission(id, userId)); //update daos
                dataBasePromises.push(commission_dao_1.default.addUserToCommission(newCommisionId, userId));
                yield Promise.all(dataBasePromises);
            })));
            const [commission, newCommission] = yield Promise.all([
                this.getCommission("id", id),
                this.getCommission("id", newCommisionId),
            ]);
            return {
                oldCommission: commission,
                newCommission,
            };
        });
    }
}
exports.default = CommissionService;
