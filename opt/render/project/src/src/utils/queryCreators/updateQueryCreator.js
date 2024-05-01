"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createUpdateQuery = (table, id, fieldsAndValues) => {
    let countFields = 0;
    let queryFields = ``;
    const queryParams = [];
    for (const field in fieldsAndValues) {
        if (field !== undefined) {
            countFields++;
            queryFields += `"${field}" = $${countFields},`;
            queryParams.push(fieldsAndValues[field]);
        }
    }
    queryFields = queryFields.slice(0, -1);
    const psql = `UPDATE ${table} SET ${queryFields} WHERE id = ${id}`;
    return { psql, queryParams };
};
exports.default = createUpdateQuery;
