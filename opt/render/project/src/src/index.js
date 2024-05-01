"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//needs real ts translation
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const morgan_1 = __importDefault(require("morgan"));
const dataDb_repository_1 = __importDefault(require("./repositories/dataDb.repository"));
const httpStatusCodes_1 = __importDefault(require("./utils/http/httpStatusCodes"));
const routes_1 = __importDefault(require("./routes"));
const formatDate_1 = require("./utils/formatDate");
const app = (0, express_1.default)();
const { json, urlencoded } = express_1.default;
// eslint-disable-next-line import/no-named-as-default-member
const { PORT } = config_1.default.config;
/* const localHosts = envVar.localhosts; */
const { INTERNAL_SERVER } = httpStatusCodes_1.default;
dataDb_repository_1.default.connect();
// Middlewares
/*
const hosts = [BACKOFFICE_CLIENT_HOST, PLEDU_CLIENT_HOST]; */
/* const shouldAcceptLocalHosts = ENV === "development" || ENV === "local"; */
//const origin: any = shouldAcceptLocalHosts ? [...hosts, ...localHosts] : hosts; //needs typing
app.use(json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
}));
app.use(urlencoded({ extended: true }));
// Healthcheck
app.get("/ping", (_req, res) => {
    res.status(200).send("ok");
});
app.use((0, morgan_1.default)("dev"));
// Routes
app.use("/v1", routes_1.default);
// Handle Error Middleware
app.use((error, _req, res, _next) => {
    const status = error.constructor === Error
        ? 500
        : error.status || INTERNAL_SERVER;
    const errorInfo = {
        status,
        error: error.name,
        message: error.message,
    };
    console.log(`[ERROR - ${(0, formatDate_1.formattedNowDate)()}]`, errorInfo);
    console.error(error.stack);
    res.status(status).json(errorInfo);
});
// Server
app.listen(PORT, () => {
    console.log(`Backoffice server listening at http://localhost:${PORT}`);
});
