"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const internalErrors_1 = __importDefault(require("./internalErrors"));
class BaseError extends Error {
    constructor(message, error) {
        super(error);
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = message || error;
        this.error = error;
    }
}
class ServiceError extends BaseError {
    /**
     * Create a new ServiceError
     * @constructs ServiceError
     * @param {string} error - Internal error codeName
     * @param   {string} message - Message to show in ServiceError
     */
    constructor(error, message) {
        super(error, message);
        const { code, name } = internalErrors_1.default[error];
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name || "Generic service error";
        this.message = message;
        this.internalError = code || 0; //check this
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ServiceError;
