"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = __importDefault(require("../../../utils/http/httpStatusCodes"));
const handleServiceErrors = (err) => {
    switch (err.internalError) {
        case 1:
            err.status = httpStatusCodes_1.default.NOT_FOUND;
            break;
        case 2:
            err.status = httpStatusCodes_1.default.UNAUTHORIZED;
            break;
        case 3:
            err.status = httpStatusCodes_1.default.UNAUTHORIZED;
            break;
        case 4:
            err.status = httpStatusCodes_1.default.BAD_REQUEST;
            break;
    }
};
exports.default = handleServiceErrors;
