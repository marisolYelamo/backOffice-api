"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internalErrors = {
    not_found: { code: 1, name: "Not Found" },
    invalid_password: { code: 2, name: "Invalid Password" },
    invalid_token: { code: 3, name: "Invalid Token" },
    bad_input: { code: 4, name: "Bad input parameter" },
};
exports.default = internalErrors;
