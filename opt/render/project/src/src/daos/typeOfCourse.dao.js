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
const dataDb_repository_1 = __importDefault(require("../repositories/dataDb.repository"));
const { query } = dataDb_repository_1.default;
class TypeOfCourseDao {
    static create(typeOfCourse) {
        const { name, tag } = typeOfCourse;
        const typeOfCourseValues = [name, tag];
        const psql = `INSERT INTO "typesOfCourses" (name, tag) VALUES ($1, $2)`;
        return query(psql, typeOfCourseValues);
    }
    static get(field, value) {
        const psql = `SELECT * FROM "typesOfCourses" WHERE ${field} = $1`;
        return query(psql, [value]);
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const psql = `SELECT * FROM "typesOfCourses"`;
            const res = yield query(psql);
            return res.rows;
        });
    }
}
exports.default = TypeOfCourseDao;
