"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndHandleErrors = void 0;
const serviceError_1 = __importDefault(require("../../../services/utils/serviceError"));
const handleServiceErrors_1 = __importDefault(require("./handleServiceErrors"));
const checkAndHandleErrors = (error, next) => {
    if (error instanceof serviceError_1.default)
        (0, handleServiceErrors_1.default)(error);
    next(error);
};
exports.checkAndHandleErrors = checkAndHandleErrors;
