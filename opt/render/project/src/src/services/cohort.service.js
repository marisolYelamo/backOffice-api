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
const serviceError_1 = __importDefault(require("./utils/serviceError"));
const cohort_dao_1 = __importDefault(require("../daos/cohort.dao"));
const students_dao_1 = __importDefault(require("../daos/students.dao"));
class CohortService {
    static createCohort(cohort) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCohort = yield cohort_dao_1.default.create(cohort);
            return newCohort;
        });
    }
    static getCohortsStudents(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield students_dao_1.default.getCohortsStudents(filters);
            return students.map((student) => (Object.assign(Object.assign({}, student), { roles: student.roles || [] })));
        });
    }
    static getCohort(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const cohort = yield cohort_dao_1.default.get(field, value);
            if (!cohort)
                throw new serviceError_1.default("not_found", `Cohort with ${String(field)} ${value} not found.`);
            return cohort;
        });
    }
    static updateCohort(label, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cohort = yield this.getCohort("label", label); //Get one by label
            const updatedCohort = yield cohort_dao_1.default.update(cohort.id, data);
            return updatedCohort;
        });
    }
    static deleteCohort(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const cohort = yield this.getCohort(field, value);
            let channels = cohort.discordChannelsIds;
            const roles = [cohort.discordRoleId];
            cohort.commissions.forEach((commission) => {
                channels = channels.concat(commission.discordChannelsIds);
                if (commission.discordRoleId)
                    roles.push(commission.discordRoleId);
            });
            yield cohort_dao_1.default.delete(cohort.id); //Delete in cohort dao
            return {
                channels,
                roles,
            };
        });
    }
    static getAllCohorts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let condition = undefined;
            const keys = Object.keys(query);
            if (keys.length > 0)
                condition = query;
            const res = yield cohort_dao_1.default.getAll(null, null, condition);
            return res;
        });
    }
}
exports.default = CohortService;
