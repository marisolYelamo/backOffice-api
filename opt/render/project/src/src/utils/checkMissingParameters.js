"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpErrors_1 = require("./http/httpErrors");
const checkMissingParameters = (body, requiredParameters) => {
    const missingParameters = [];
    requiredParameters.forEach((prop) => {
        if (body[prop] === undefined)
            missingParameters.push(prop);
    });
    if (missingParameters.length)
        throw new httpErrors_1.Api400Error(`Missing parameters. Required: ${missingParameters.join(", ")}.`);
};
exports.default = checkMissingParameters;
