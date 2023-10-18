import dataDB from "../repositories/dataDb.repository";
const { query } = dataDB;
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

    const queryParams: string[] = [];
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

    const psql = `UPDATE "landingData" SET ${filters.slice(
      0,
      -1
    )} WHERE id = ${id}`;

    return query(psql, queryParams);
  }
}

export default LandingDataDao;
