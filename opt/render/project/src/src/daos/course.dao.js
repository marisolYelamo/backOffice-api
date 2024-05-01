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
const course_mapper_1 = __importDefault(require("./mappers/course.mapper"));
const insertQueryCreator_1 = __importDefault(require("../utils/queryCreators/insertQueryCreator"));
const updateQueryCreator_1 = __importDefault(require("../utils/queryCreators/updateQueryCreator"));
const dataDb_repository_1 = __importDefault(require("../repositories/dataDb.repository"));
const { query } = dataDb_repository_1.default;
class CourseDao {
    static create(course) {
        return __awaiter(this, void 0, void 0, function* () {
            const { psql, queryParams } = (0, insertQueryCreator_1.default)("Courses", course, true);
            const res = yield query(psql, queryParams);
            const courseCreated = res.rows[0];
            /** CREATE COHORT EN PLEDU */
            return this.get("id", courseCreated.id);
        });
    }
    static get(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryField = field === "id" ? "C.id" : field;
            const psql = `SELECT *, C.id as id, TC.id as type FROM Courses as C
    INNER JOIN "typesOfCourses" as TC ON C.type = TC.id
    WHERE ${queryField} = $1`;
            const res = yield query(psql, [value]);
            if (!res.rows.length)
                return null;
            return (0, course_mapper_1.default)(res.rows[0]);
        });
    }
    static update(id, course) {
        const { psql, queryParams } = (0, updateQueryCreator_1.default)("Courses", id, course);
        return query(psql, queryParams);
    }
    static getAll(offset, limit, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            let psql = `SELECT *, C.id as id, TC.id as type FROM Courses as C
    INNER JOIN "typesOfCourses" as TC ON C.type = TC.id `;
            const values = [];
            const keys = Object.keys(condition);
            if (keys.length) {
                psql += " WHERE ";
                keys.forEach((key, i) => {
                    values.push(condition[key]);
                    if (key === "cohortLabel")
                        psql += `C."cohortLabel" ILIKE '%'||$${i + 1}||'%' `;
                    else
                        psql += `"${key}" = $${i + 1} `;
                    if (i !== keys.length - 1)
                        psql += "AND ";
                });
            }
            if (limit)
                psql += ` LIMIT ${limit}`;
            if (offset)
                psql += ` OFFSET ${offset}`;
            psql += `ORDER BY C."startDate" ASC`;
            const res = yield query(psql, values);
            return res.rows.map((c) => (0, course_mapper_1.default)(c));
        });
    }
    static countAll(condition) {
        let psql = "SELECT COUNT (*) FROM Courses";
        const values = [];
        const keys = Object.keys(condition);
        if (keys.length) {
            psql += " WHERE ";
            keys.forEach((key, i) => {
                values.push(condition[key]);
                psql += `"${key}" = $${i + 1} `;
                if (i !== keys.length - 1)
                    psql += "AND ";
            });
        }
        return query(psql, values);
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const psql = "DELETE FROM Courses WHERE id=$1 RETURNING *";
            const res = yield query(psql, [id]);
            return res.rows[0];
        });
    }
}
exports.default = CourseDao;
