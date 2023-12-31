const createInsertQuery = (table, fieldsAndValues, returning = false) => {
  let queryFields = ``;
  let values = "";
  let countFields = 0;
  const queryParams: string[] = [];

  for (const field in fieldsAndValues) {
    if (field !== undefined) {
      countFields++;
      queryFields += `"${field}",`;
      values += `$${countFields},`;
      queryParams.push(fieldsAndValues[field]);
    }
  }

  values = values.slice(0, -1);
  queryFields = queryFields.slice(0, -1);

  let psql = `INSERT INTO ${table} (${queryFields}) VALUES (${values})`;

  if (returning) psql += " RETURNING *";

  return { psql, queryParams };
};

export default createInsertQuery;
