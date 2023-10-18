import connectPsql from "./psql.respository";
import { dataDb } from "../config";

const { user, host, name, password, port } = dataDb;

const dataDB = connectPsql(user, host, name, password, port);

export default dataDB;
