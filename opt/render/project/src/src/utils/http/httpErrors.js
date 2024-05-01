"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api500Error = exports.Api409Error = exports.Api404Error = exports.Api403Error = exports.Api401Error = exports.Api400Error = void 0;
const httpStatusCodes_1 = __importDefault(require("./httpStatusCodes"));
class BaseError extends Error {
    constructor(message, status, name) {
        super(name);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.message = message;
        this.status = status; //check this
        Error.captureStackTrace(this);
    }
}
class Api400Error extends BaseError {
    constructor(message) {
        super(message, httpStatusCodes_1.default.BAD_REQUEST, "Bad Request");
    }
}
exports.Api400Error = Api400Error;
class Api401Error extends BaseError {
    constructor(message) {
        super(message, httpStatusCodes_1.default.UNAUTHORIZED, "Unauthorized");
    }
}
exports.Api401Error = Api401Error;
class Api403Error extends BaseError {
    constructor(message) {
        super(message, httpStatusCodes_1.default.FORBIDDEN, "Forbidden");
    }
}
exports.Api403Error = Api403Error;
class Api404Error extends BaseError {
    constructor(message) {
        super(message, httpStatusCodes_1.default.NOT_FOUND, "Not found");
    }
}
exports.Api404Error = Api404Error;
class Api409Error extends BaseError {
    constructor(message) {
        super(message, httpStatusCodes_1.default.CONFLICT, "Conflict");
    }
}
exports.Api409Error = Api409Error;
class Api500Error extends BaseError {
    constructor(message) {
        super(message, httpStatusCodes_1.default.INTERNAL_SERVER, "Internal Server Error");
    }
}
exports.Api500Error = Api500Error;
