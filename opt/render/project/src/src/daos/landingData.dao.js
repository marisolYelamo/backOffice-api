"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataDb_repository_1 = __importDefault(require("../repositories/dataDb.repository"));
const { query } = dataDb_repository_1.default;
class LandingDataDao {
    static create(data) {
        const { concept, description } = data;
        const dataValues = [concept, description];
        const psql = `INSERT INTO "landingData" (concept, description) VALUES ($1, $2)`;
        return query(psql, dataValues);
    }
    static get(field, value) {
        const psql = `SELECT * FROM "landingData" WHERE ${field} = $1`;
        return query(psql, [value]);
    }
    static getAll() {
        const psql = `SELECT * FROM "landingData"`;
        return query(psql);
    }
    static update(id, landingData) {
        const { concept, description } = landingData;
        const queryParams = [];
        let filters = "";
        let fields = 0;
        if (concept) {
            fields++;
            filters += `concept = $${fields},`;
            queryParams.push(concept);
        }
        if (description) {
            fields++;
            filters += `description = $${fields},`;
            queryParams.push(description);
        }
        const psql = `UPDATE "landingData" SET ${filters.slice(0, -1)} WHERE id = ${id}`;
        return query(psql, queryParams);
    }
}
exports.default = LandingDataDao;
