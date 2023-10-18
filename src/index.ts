//needs real ts translation
import cors from "cors";
import express from "express";
import envVar from "./config";
import morgan from "morgan";
import dataDB from "./repositories/dataDb.repository";
import httpStatusCodes from "./utils/http/httpStatusCodes";
import routes from "./routes";
import { ApiErrors } from "./utils/http/httpErrors";
import { formattedNowDate } from "./utils/formatDate";
import functions from "firebase-functions"

const app = express();
const { json, urlencoded } = express;
const { PORT, ENV, BACKOFFICE_CLIENT_HOST, PLEDU_CLIENT_HOST } = envVar.config;
const localHosts = envVar.localhosts;
const { INTERNAL_SERVER } = httpStatusCodes;

dataDB.connect();

// Middlewares

const hosts = [BACKOFFICE_CLIENT_HOST, PLEDU_CLIENT_HOST];
const shouldAcceptLocalHosts = ENV === "development" || ENV === "local";

const origin: any = shouldAcceptLocalHosts ? [...hosts, ...localHosts] : hosts; //needs typing

app.use(json());
app.use(
  cors({
    origin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);
app.use(urlencoded({ extended: true }));

// Healthcheck
app.get("/ping", (_req, res) => {
  res.status(200).send("ok");
});

app.use(morgan("dev"));

// Routes
app.use("/v1", routes);

// Handle Error Middleware
app.use((error: Error | ApiErrors, _req, res, _next) => {
  const status =
    error.constructor === Error
      ? 500
      : (error as ApiErrors).status || INTERNAL_SERVER;

  const errorInfo = {
    status,
    error: error.name,
    message: error.message,
  };

  console.log(`[ERROR - ${formattedNowDate()}]`, errorInfo);
  console.error(error.stack);

  res.status(status).json(errorInfo);
});

// Server
app.listen(PORT, () => {
  console.log(`Backoffice server listening at http://localhost:${PORT}`);
});

exports.api = functions.https.onRequest(app)