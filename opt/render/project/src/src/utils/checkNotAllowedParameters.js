"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpErrors_1 = require("./http/httpErrors");
const checkNotAllowedParameters = (body, allowedParameters) => {
    const notAllowedParameters = [];
    for (const prop in body)
        if (!allowedParameters.includes(prop))
            notAllowedParameters.push(prop);
    if (notAllowedParameters.length)
        throw new httpErrors_1.Api400Error(`Unexpected parameters. Not allowed: ${notAllowedParameters.join(", ")}.`);
};
exports.default = checkNotAllowedParameters;
